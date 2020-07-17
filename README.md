**************************************************************
****AWS based Web Service Development – Job Recommendation****
**************************************************************

The project is implemented using the following features:

* The project aims to use personalization to improve ticket search and recommendation 
* Created Java servlets with RESTful APIs to handle HTTP requests and responses
* Built MySQL database on Amazon RDS to store position data from Github API
* Designed algorithms (e.g., content-based recommendation) to improve event recommendation based on search history and favorite records) 
* Deployed server to Amazon EC2 to handle 150 queries per second tested by Apache JMeter. 

Keywords: 
AWS, Amazon RDS, EC2, Apache Tomcat, MySQL, RESTful API, Content-based Recommendation Algorithm

**************************************************************
               ****How to use the website *****
**************************************************************
1. Please visit http://18.188.125.18/JobRecommendation/ to test its functionality. 
2. Register an account with your own username and password, and then go back to the main page.
3. Login with the current username and password.
4. The website will return the nearby recommended items with a default keyword of "engineer'
5. Click the 'heart' icon on the right side of some items as 'favorited items', and you may see the saved result under 'My Favorites' page.
6. Under 'Recommendation' page, the website will return the recommendation items based on the content saved under the 'My Favorite' page.
7. You are all done!

Note: If you cannot see the content under the 'nearby' page, it's probably because the freed MonkeyLearn API used in the project throttles and 
      thus cannot return the results. Normally this happens at the end of the month, and you may try it at the beginning of the month :)
