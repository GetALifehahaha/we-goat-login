This is an easy to use authentication module/application
It uses Axios, Django, Django Rest Framework, and JWT with Cookies to handle Authentication ,User Credentials, and Sessions

Routes -> You import both of these to the App.jsx and wrap the these to their respective route types (where you need no authentication or where you need to) :
    Authenticated Route: Wrap routes/pages where you need user authentication to enter

AuthContext & AuthProvider -> Provides a few function to handle authentications
    initializeAuth -> On first load, this checks whether you are logged in and when your session is still valid. If so, allow entry to the protected routes. If not, throw error and log you out.
    login -> require username and password
    logout -> expires your JWT Token and User Credentials
    refershUser -> if you have refresh token, refresh your access token to keep your authentication credentials valid
    value -> provides the children pages with these functions
 
    -> Wrap the entire App.jsx with AuthProvider in order to keep the user state valid through out the App

AuthService -> A Class that provides handles methods, requests, and attributes regarding authentication states.
    
    attributes:
        isRefreshing -> simple loading state for the requests in this class
        failedQueue -> all failed requests are stored in the queue for re-requests and not terminate the subceeding requests
        token -> the token for the user logging in. Will be stored in the cookies after

    methods: 
        login -> requires username & password from AuthContext, will send a request to the backend. If successful, set the user token with response.data.token. Errors are thrown to be handled.
        logout -> sets all attributes to default null, false, and []. Sends a request to the backend to void the token.
        decodeToken -> a helper function to decode the token in the user state. Will also check if the token is still valid based on its lifetime (set in the backend)
        getCurrentUser -> helper function for the web to get the current user data
        getToken -> helper function to get the token
        isTokenExpired -> helper function to check whether the token is expired.
        refreshToken -> a method to refresh the access token using the refresh token
        checkAuthStatus -> a method to check the authStatus of the user
        processQueue -> processes failed queues
        addToQueue -> helper function to add failed requests to failedQueue