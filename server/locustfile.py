# locustfile.py
from locust import HttpUser, task, between

class WebsiteTestUser(HttpUser):
    wait_time = between(1, 2) 
    
    @task
    def product_list(self):
        self.client.get("/api/products/")