import pytest
from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select

class Test_41:
    baseURL = "http://localhost:3000/login"

    def setup_method(self, method):
        self.driver = webdriver.Chrome()
        self.driver.get(self.baseURL)
    def teardown_method(self, method):
        self.driver.close()

    def test_logout(self):
        profile = "Buyer"
        username = "syella"
        password = "syella"
        expectedCondition = "Retrieve New Listing List"
        expectedTitle = "Login"

        select_element = self.driver.find_element("xpath",'/html[1]/body[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/select[1]')
        select = Select(select_element)
        select.select_by_value(profile)

        self.driver.find_element("id","username").clear() 
        self.driver.find_element("id","username").send_keys(username) 

        self.driver.find_element("id","password").clear() 
        self.driver.find_element("id","password").send_keys(password) 

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[6]/button[1]").click()

        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.title_is(expectedCondition))

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/nav[1]/div[1]/div[1]/button[1]/div[1]/div[1]/img[1]").click()

        self.driver.find_element("xpath","//button[contains(text(),'Log Out')]").click()

        self.driver.find_element("xpath","//span[contains(text(),'Yes, log me out')]").click()

        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.title_is(expectedTitle))
        
        act_title = self.driver.title
        assert act_title == expectedTitle
    
    def test_logoutCancel(self):
        profile = "Buyer"
        username = "syella"
        password = "syella"
        expectedCondition = "Retrieve New Listing List"
        expectedTitle = "Retrieve New Listing List"

        select_element = self.driver.find_element("xpath",'/html[1]/body[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/select[1]')
        select = Select(select_element)
        select.select_by_value(profile)

        self.driver.find_element("id","username").clear() 
        self.driver.find_element("id","username").send_keys(username) 

        self.driver.find_element("id","password").clear() 
        self.driver.find_element("id","password").send_keys(password) 

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[6]/button[1]").click()

        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.title_is(expectedCondition))

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/nav[1]/div[1]/div[1]/button[1]/div[1]/div[1]/img[1]").click()

        self.driver.find_element("xpath","//button[contains(text(),'Log Out')]").click()

        self.driver.find_element("xpath","//span[contains(text(),'No, cancel')]").click()

        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.title_is(expectedTitle))
        
        act_title = self.driver.title
        assert act_title == expectedTitle