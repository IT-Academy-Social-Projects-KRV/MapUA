# MapUA

This project is called MapUA.
It allows you to create your personal Geo location and share them or see other people locations.  
There are a lot of places in Ukraine which is really interesting but quite unpopular. You can live a few hours away from a beautiful castle, but never knew it was there because there is no good searching tool for this kind of stuff.
For example you found a beautiful place in the woods, and you want to share it with your friends. You can zoom into the map, choose the correct place, enter the name, and some description, and now, people can see you location on the map.

### Working project on Heroku

[Link to the Webpage](https://map-ua.herokuapp.com/)  
[Link to the API](https://map-ua.herokuapp.com/api-docs/)

### If you want open it locally:

- **first step** - you should do git clone this repository to you local machine
- **second step** - you should follow instruction README.md in frontend folder
- **third step** - you should follow instruction README.md in backend folder

### Techologies

React, Typescript, Redux, Node.js, Express, MongoDb, Mui, i18, Swagger

### Authorization

Use Passport.js with JWT token, Google auth, Facebook auth

### MAP

https://leafletjs.com/

Actions with Locations and data:

1. Authorized users can add\remove\edit own locations
2. Moderator and Admin can add\remove\edit own and users locations
3. When location are creating user should specify:

- "Name" of new location;
- "Descriptions" of new location;
- some predefined filter values which user can choose from the list, other user can find location on the map using search on filters;
- add one one more photos;

5. Authorized users can click "like" or "dislike"
6. Authorized users can click "add to favorite" or "add to visited" icons, after this action target location are adding to necessary array in database.
7. User can create link to share location to anether user using for this "to share" button
8. When user ckick to user name or avatar in "Location created by:" block, user will be redirected to this user profile page
9. If user subscribed to user who created watched location , it will see blue badge near avatar of this user in location page.
10. User can see location creatin date in location page.
11. Users, Moderators and Admins can add\remove\edit comments to location and reply for comment of another users.
12. In comment section near user avatar user can see badge with user role when this comment was added by Moderator or Admin. Ordinary users hasnt any badges near avatar
    Verification of location
13. When location only was created it has verificationStatus: "unverified"
14. Authorized users can click "like" or "dislike", after that location collect 5 likes it verificationStatus change to "waiting to verifiyng"
15. Moderator and Admin can see locations with "waiting to verifiyng" status in own profile page and can change status of locations from "waiting to verifiyng" to "verified" or "unverified"
16. If Moderator or Admin change status of locations from "waiting to verified" to "unverified" and this location get one new "like" it verificationStatus change to "waiting to verifying" again
    Complain to location
17. Authorized users can complain for location , for this it shold use "Report location" button
18. Moderator and Admin can see locations with reported=TRUE status in own profile page and decline this state when in necessary
    Work with search and filters:
19. in search window user can enter name or part of location name to find it
    "Filters" using for reduce location count on the map to make it easier to find places of interest. User can use one on more filters in one time. When user checked more then one filters in one block location count increases. When user checked filters in different blocks in one time location count decreases.
20. In "Cost" block user can choose cost level, filters work on data that users specify when creating location
21. In "Seasonal" block user can choose season when location is aviable, filters work on data that users specify when creating location
22. In "Verified locations" block user can choose "verified" or "unverified" locations, how its work you can see in "Verification of location" paragraph
23. Personal block:
    22.1. User can find own visited or favorite locations on the map using search on filters "favorite" or "visited";
    22.2. User can find own created locations on the map using search on filters "personal";
24. In "Subscriptions" block user can see all users to which he subscribed. After checked some user name in "Subscriptions" block on the map will be displayed all locations wich was created by this user
    Other User profile page
    If user subscribed to user who created watched location , it will see blue badge near avatar of this user in location page.
25. On this page user can "Subsribe" on "Unsubsribe" for other user. When user subscribed for other user it can see this another user in "Subscription" block of filters
26. User with "amdin" role also can give or remove "moderator" role for another user on this page
    Own User profile page:
27. Only Authorized users can see "My profile" button ih the navigation panel
28. User can "Logout" here.
29. User can edit own data
30. User can see "Subscription" and "Subscribers" tabs with list user to whom he is subscribed and who subscribed to him respectively.
31. Moderators and Admins can also see "Waiting for verify" and "reported location" in own profile page, how its work you can see in "Verification of location" or "Complain to location" chapters respectively.
