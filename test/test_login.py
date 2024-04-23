import pytest
from selenium import webdriver
from backend.app import LoginPage

class TC001_Login:
    baseURL = "/"
    role = "Buyer"
    username = "tiffany"
    password = "tiffany"

    def testLogin(self):
        self.driver = webdriver.Chrome()
        self.driver.get(self.baseURL)
        act_title = self.driver.title
        self.driver.close()