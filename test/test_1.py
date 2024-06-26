import pytest
from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select

class Test_1:
    baseURL = "http://localhost:3000/"

    def setup_method(self, method):
        self.driver = webdriver.Chrome()
        self.driver.get(self.baseURL)
    def teardown_method(self, method):
        self.driver.close()

    def test_openLogin(self):
        act_title = self.driver.title
        assert act_title == "Login"

    def test_loginCorrect(self):
        profile = "System Admin"
        username = "carla"
        password = "carla"
        expectedTitle = "Retrieve User Account List"

        select_element = self.driver.find_element("xpath",'/html[1]/body[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/select[1]')
        select = Select(select_element)
        select.select_by_value(profile)

        self.driver.find_element("id","username").clear() 
        self.driver.find_element("id","username").send_keys(username) 

        self.driver.find_element("id","password").clear() 
        self.driver.find_element("id","password").send_keys(password) 

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[6]/button[1]").click()
        
        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.title_is(expectedTitle))

        act_title = self.driver.title
        assert act_title == expectedTitle

    def test_loginWrongProfile(self):
        profile = "Seller"
        username = "carla"
        password = "carla"

        select_element = self.driver.find_element("xpath",'/html[1]/body[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/select[1]')
        select = Select(select_element)
        select.select_by_value(profile)

        self.driver.find_element("id","username").clear() 
        self.driver.find_element("id","username").send_keys(username) 

        self.driver.find_element("id","password").clear() 
        self.driver.find_element("id","password").send_keys(password) 

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[6]/button[1]").click()
        
        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.alert_is_present())
        
        assert self.driver.switch_to.alert.text == "Invalid User Account"
        self.driver.switch_to.alert.dismiss()

    def test_loginWrongUsernamePassword(self):
        profile = "System Admin"
        username = "carl"
        password = "carl"

        select_element = self.driver.find_element("xpath",'/html[1]/body[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/select[1]')
        select = Select(select_element)
        select.select_by_value(profile)

        self.driver.find_element("id","username").clear() 
        self.driver.find_element("id","username").send_keys(username) 

        self.driver.find_element("id","password").clear() 
        self.driver.find_element("id","password").send_keys(password) 

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[6]/button[1]").click()
        
        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.alert_is_present())
        
        assert self.driver.switch_to.alert.text == "Invalid User Account"
        self.driver.switch_to.alert.dismiss()

    def test_loginEmpty(self):
        profile = "System Admin"

        select_element = self.driver.find_element("xpath",'/html[1]/body[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/select[1]')
        select = Select(select_element)
        select.select_by_value(profile)

        self.driver.find_element("id","username").clear() 

        self.driver.find_element("id","password").clear() 

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[6]/button[1]").click()
        
        notification = self.driver.find_element("xpath","//div[contains(text(),'Please enter both username and password.')]").text
        assert notification == "Please enter both username and password."