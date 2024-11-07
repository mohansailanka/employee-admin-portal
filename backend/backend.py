import tornado.ioloop
import tornado.web
import json
import mysql.connector


# Establish a connection to your MySQL database
db_connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="mohansai25@2002",
    database="EmployerPortal"
)

class EmployerHandler(tornado.web.RequestHandler):
    def initialize(self):
        # Create a cursor object to execute SQL queries
        self.cursor = db_connection.cursor()

    def create_employers_table(self):
        # Create the employers table if it doesn't exist
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS employers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                fullname VARCHAR(255),
                email VARCHAR(255),
                phone_number VARCHAR(255),
                address VARCHAR(255),
                job_title VARCHAR(255),
                department VARCHAR(255),
                start_date DATE,
                salary DECIMAL(10, 2),
                payment_method VARCHAR(255),
                bank_account_details VARCHAR(255),
                bank_name VARCHAR(255)
            )
        """)
        db_connection.commit()

    def set_default_headers(self):
        # CORS headers to allow requests from any origin
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With")
        self.set_header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")

    def options(self, employer_id=None):
        # This method is used to handle the pre-flight OPTIONS request.
        # Tornado does not automatically handle OPTIONS requests for CORS,
        # so we need to respond manually with appropriate headers.
        self.set_status(204)
        self.finish()


    def get(self):
        self.create_employers_table()
        query = "SELECT * FROM employers"
        self.cursor.execute(query)

        employers = []
        for row in self.cursor.fetchall():
            employer = {
                "id": row[0],
                "fullname": row[1],
                "email": row[2],
                "phone_number": row[3],
                "address": row[4],
                "job_title": row[5],
                "department": row[6],
                "start_date": str(row[7]),
                "salary": str(row[8]),
                "payment_method": row[9],
                "bank_account_details": row[10],
                "bank_name": row[11]
            }
            employers.append(employer)

        self.write(json.dumps(employers))

    def post(self):
        self.create_employers_table()
        data = json.loads(self.request.body)
        fullname = data.get("fullname")
        email = data.get("email")
        phone_number = data.get("phone_number")
        address = data.get("address")
        job_title = data.get("job_title")
        department = data.get("department")
        start_date = data.get("start_date")
        salary = data.get("salary")
        payment_method = data.get("payment_method")
        bank_account_details = data.get("bank_account_details")
        bank_name = data.get("bank_name")
        query = """
            INSERT INTO employers (fullname, email, phone_number, address, job_title, department, start_date, salary, payment_method, bank_account_details, bank_name)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (fullname, email, phone_number, address, job_title, department, start_date, salary, payment_method, bank_account_details, bank_name)

        self.cursor.execute(query, values)
        db_connection.commit()

        self.write("Employer created successfully")

    def delete(self, employer_id):
        self.create_employers_table()

        query = "DELETE FROM employers WHERE id = %s"
        values = (employer_id,)

        self.cursor.execute(query, values)
        db_connection.commit()

        if self.cursor.rowcount > 0:
            self.write(f"Employer with ID {employer_id} deleted successfully")
        else:
            self.set_status(404)
            self.write(f"Employer with ID {employer_id} not found")

def make_app():
    return tornado.web.Application([
        (r"/employers/?", EmployerHandler),
        (r"/employers/(\d+)", EmployerHandler)
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(8080)
    print("Server started on http://localhost:8080")
    tornado.ioloop.IOLoop.current().start()
