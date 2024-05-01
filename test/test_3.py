import pytest
from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select

class Test_3:
    baseURL = "http://localhost:3000/login"

    def setup_method(self, method):
        self.driver = webdriver.Chrome()
        self.driver.get(self.baseURL)
    def teardown_method(self, method):
        self.driver.close()

    def test_openCreateAccount(self):
        profile = "System Admin"
        username = "carla"
        password = "carla"
        expectedTitle1 = "SA User Account"
        expectedTitle2 = "SA Create Account Page"

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

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[1]/div[1]/div[1]/a[1]/div[1]/button[1]").click()

        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.title_is(expectedTitle2))

        act_title = self.driver.title
        assert act_title == expectedTitle2

    def test_createNewAccount(self):
        profile = "System Admin"
        username = "carla"
        password = "carla"

        name = "jewe"
        newUsername = "jewe"
        newPassword = "jewe"
        confirmPass = "jewe"
        email = "jewe@gmail.com"
        phone = "12345678"
        type = "System Admin"

        expectedTitle1 = "SA User Account"
        expectedTitle2 = "SA Create Account Page"

        expectedPrompt = "User Account created successfully!"

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

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[1]/div[1]/div[1]/a[1]/div[1]/button[1]").click()

        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.title_is(expectedTitle2))

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/input[1]").send_keys(name)
        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/input[1]").send_keys(newUsername)
        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[3]/div[1]/div[1]/input[1]").send_keys(newPassword)
        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[4]/div[1]/div[1]/input[1]").send_keys(confirmPass)
        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[5]/div[1]/div[1]/input[1]").send_keys(email)
        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/input[1]").send_keys(phone)
        
        newProfile = self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[2]/div[2]/div[1]/select[1]")
        selectProfile = Select(newProfile)
        selectProfile.select_by_value(type)

        self.driver.find_element("xpath","//button[contains(text(),'Create')]").click()

        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.text_to_be_present_in_element(("id","successPrompt"), expectedPrompt))

        message = self.driver.find_element("id","successPrompt").text
        assert message == expectedPrompt

    def test_createOldAccount(self):
        profile = "System Admin"
        username = "carla"
        password = "carla"

        name = "jewe"
        newUsername = "jewe"
        newPassword = "jewe"
        confirmPass = "jewe"
        email = "jewe@gmail.com"
        phone = "12345678"
        type = "System Admin"

        expectedTitle1 = "SA User Account"
        expectedTitle2 = "SA Create Account Page"

        expectedPrompt = "User account already exists"

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

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[1]/div[1]/div[1]/a[1]/div[1]/button[1]").click()

        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.title_is(expectedTitle2))

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/input[1]").send_keys(name)
        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/input[1]").send_keys(newUsername)
        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[3]/div[1]/div[1]/input[1]").send_keys(newPassword)
        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[4]/div[1]/div[1]/input[1]").send_keys(confirmPass)
        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[1]/div[5]/div[1]/div[1]/input[1]").send_keys(email)
        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/input[1]").send_keys(phone)
        
        newProfile = self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[2]/div[2]/div[2]/div[1]/select[1]")
        selectProfile = Select(newProfile)
        selectProfile.select_by_value(type)

        self.driver.find_element("xpath","//button[contains(text(),'Create')]").click()

        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.text_to_be_present_in_element(("id","failedPrompt"), expectedPrompt))

        message = self.driver.find_element("id","failedPrompt").text
        assert message == expectedPrompt

    def test_createEmptyAccount(self):
        profile = "System Admin"
        username = "carla"
        password = "carla"

        expectedTitle1 = "SA User Account"
        expectedTitle2 = "SA Create Account Page"

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

        self.driver.find_element("xpath","//body/div[@id='root']/div[1]/div[1]/div[1]/div[1]/div[1]/a[1]/div[1]/button[1]").click()

        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.title_is(expectedTitle2))

        self.driver.find_element("xpath","//button[contains(text(),'Create')]").click()

        wait = WebDriverWait(self.driver, 3)
        wait.until(EC.text_to_be_present_in_element(("id","failedPrompt"), expectedPrompt))

        message = self.driver.find_element("id","failedPrompt").text
        assert message == expectedPrompt