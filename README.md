# Aspire Loan app
The steps to run the app are as follows:

Step 1. The repository is public. So clone the repository. - `git clone git@github.com:nilanshu/Aspire.git`

Step 2. Install mysql in your system. - `brew install mysql`

Step 3. Start mysql. - `brew services start mysql`

Step 4. Create a mysql user with name `root`, and without any password.

Step 5. Create a database named `loan_app`. The mysql command for that is - `create database loan_app;`

Step 6. Go to local Repository and install dependencies. - `npm install`

Step 7. Start the server. - `npm run dev`

Step 8. Run the postman apis.