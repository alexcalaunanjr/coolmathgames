import pytest
from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select

class Test_9:
    baseURL = "http://localhost:3000/login"

    def setup_method(self, method):
        self.driver = webdriver.Chrome()
        self.driver.get(self.baseURL)
    def teardown_method(self, method):
        self.driver.close()

    def test_openCreateProfile(self):
        profile = "System Admin"
        username = "carla"
        password = "carla"
        expectedTitle1 = "SA User Account"
        expectedTitle2 = "SA User Profile"
        expectedTitle3 = "SA Create Profile Page"

        select_element = self.driver.find_element("xpath",'/html[1]/body[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/select[1]')
        select = Select(select_element)
        select.select_by_value(profile)

        self.driver.find_element("id","username").clear() 
        self.driver.find_element("id","username").send_keys(username) 

        self.driver.find_element("id","password").clear() 
        self.driver.find_element("id","password").send_keys(password) 

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[6]/button[1]").click()
        
        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.title_is(expectedTitle1))

        self.driver.find_element("xpath","//a[contains(text(),'User Profile')]").click()

        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.title_is(expectedTitle2))

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[1]/div[1]/a[1]/div[1]/button[1]").click()

        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.title_is(expectedTitle3))

        act_title = self.driver.title
        assert act_title == expectedTitle3

    def test_createNewProfile(self):
        profile = "System Admin"
        username = "carla"
        password = "carla"

        name = "pizza"
        desc = "womp womp"

        expectedTitle1 = "SA User Account"
        expectedTitle2 = "SA User Profile"
        expectedTitle3 = "SA Create Profile Page"

        expectedPrompt = "Account created successfully!"

        select_element = self.driver.find_element("xpath",'/html[1]/body[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/select[1]')
        select = Select(select_element)
        select.select_by_value(profile)

        self.driver.find_element("id","username").clear() 
        self.driver.find_element("id","username").send_keys(username) 

        self.driver.find_element("id","password").clear() 
        self.driver.find_element("id","password").send_keys(password) 

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[6]/button[1]").click()
        
        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.title_is(expectedTitle1))

        self.driver.find_element("xpath","//a[contains(text(),'User Profile')]").click()

        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.title_is(expectedTitle2))

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[1]/div[1]/a[1]/div[1]/button[1]").click()

        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.title_is(expectedTitle3))

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/input[1]").send_keys(name)
        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[2]/textarea[1]").send_keys(desc)

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[5]/button[1]").click()

        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.text_to_be_present_in_element(("id","successPrompt"), expectedPrompt))

        message = self.driver.find_element("id","successPrompt").text
        assert message == expectedPrompt

    def test_createOldProfile(self):
        profile = "System Admin"
        username = "carla"
        password = "carla"

        name = "pizza"
        desc = "womp womp"

        expectedTitle1 = "SA User Account"
        expectedTitle2 = "SA User Profile"
        expectedTitle3 = "SA Create Profile Page"

        expectedPrompt = "User profile Creation Failed!"

        select_element = self.driver.find_element("xpath",'/html[1]/body[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/select[1]')
        select = Select(select_element)
        select.select_by_value(profile)

        self.driver.find_element("id","username").clear() 
        self.driver.find_element("id","username").send_keys(username) 

        self.driver.find_element("id","password").clear() 
        self.driver.find_element("id","password").send_keys(password) 

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[6]/button[1]").click()
        
        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.title_is(expectedTitle1))

        self.driver.find_element("xpath","//a[contains(text(),'User Profile')]").click()

        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.title_is(expectedTitle2))

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[1]/div[1]/a[1]/div[1]/button[1]").click()

        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.title_is(expectedTitle3))

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/input[1]").send_keys(name)
        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[2]/textarea[1]").send_keys(desc)

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[5]/button[1]").click()

        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.text_to_be_present_in_element(("id","failedPrompt"), expectedPrompt))

        message = self.driver.find_element("id","failedPrompt").text
        assert message == expectedPrompt

    def test_createEmptyProfile(self):
        profile = "System Admin"
        username = "carla"
        password = "carla"

        expectedTitle1 = "SA User Account"
        expectedTitle2 = "SA User Profile"
        expectedTitle3 = "SA Create Profile Page"

        expectedPrompt = "Please enter all fields."

        select_element = self.driver.find_element("xpath",'/html[1]/body[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/select[1]')
        select = Select(select_element)
        select.select_by_value(profile)

        self.driver.find_element("id","username").clear() 
        self.driver.find_element("id","username").send_keys(username) 

        self.driver.find_element("id","password").clear() 
        self.driver.find_element("id","password").send_keys(password) 

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[6]/button[1]").click()
        
        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.title_is(expectedTitle1))

        self.driver.find_element("xpath","//a[contains(text(),'User Profile')]").click()

        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.title_is(expectedTitle2))

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[1]/div[1]/a[1]/div[1]/button[1]").click()

        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.title_is(expectedTitle3))

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/input[1]").clear()
        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[2]/textarea[1]").clear()

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[5]/button[1]").click()

        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.text_to_be_present_in_element(("id","failedPrompt"), expectedPrompt))

        message = self.driver.find_element("id","failedPrompt").text
        assert message == expectedPrompt