#TI1506 Lab Assignment 1
Calvin Nhieu, Luc Koppens. 11.16.16

1) Did not install VM. Decided to work locally.

2.1) 

**HEAD**

```
HEAD /sport HTTP/1.1
host: www.nu.nl

HTTP/1.1 200 OK
Date: Wed, 16 Nov 2016 13:15:39 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 241383
Vary: Accept-Encoding
Vary: Accept-Encoding
Expires: Wed, 16 Nov 2016 13:15:56 GMT
Vary: Accept-Encoding
Last-Modified: Wed, 16 Nov 2016 13:14:56 GMT
Cache-Control: max-age=60
Age: 42
Server: shield
Accept-Ranges: bytes
Via: 1.1 google
```

**GET**

```
GET /sport HTTP/1.1
host: www.nu.nl

HTTP/1.1 200 OK
Date: Wed, 16 Nov 2016 13:16:27 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 241383
Vary: Accept-Encoding
Vary: Accept-Encoding
Expires: Wed, 16 Nov 2016 13:17:20 GMT
Vary: Accept-Encoding
Last-Modified: Wed, 16 Nov 2016 13:16:20 GMT
Cache-Control: max-age=60
Age: 7
Server: shield
Accept-Ranges: bytes
Via: 1.1 google

*HTML content omitted
```

2.2) No, they do not match because the response only includes the html of the webpage, not the CSS or JavaScript.

2.3) The content expires on Wed, 16 Nov 2016 12:49:58 GMT, exactly one minute after the page was accessed. This means the web cache serving this resource will continue serving this version of the resource for one minute. After the resource expires, the cache will update the resource from the original source (origin server).

2.4) If `If-Modified-Since` is used and set before the `Last-Modified` date, then the HTTP response will be fetched from the origin server. If set after, the HTTP response will be fetched from the web cache and no cache validation will happen.

2.5) The responses are significantly different because nu.nl points to WWWizer, a domain redirect service that redirects naked domains to www domains. Visiting nu.nl in the browser successfully performs the redirect from nu.nl to www.nu.nl.

**www.nu.nl**

```
$telnet www.nu.nl 80
Trying 107.178.244.221...
Connected to nunl.aws.sanomaservices.nl.
Escape character is '^]'.

HEAD /sport HTTP/1.1
host: www.nu.nl

HTTP/1.1 200 OK
Date: Wed, 16 Nov 2016 13:25:36 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 241051
Vary: Accept-Encoding
Vary: Accept-Encoding
Expires: Wed, 16 Nov 2016 13:25:47 GMT
Vary: Accept-Encoding
Last-Modified: Wed, 16 Nov 2016 13:24:47 GMT
Cache-Control: max-age=60
Age: 32
Server: shield
Accept-Ranges: bytes
Via: 1.1 google
```
**nu.nl**

```
$telnet nu.nl 80
Trying 174.129.25.170...
Connected to nu.nl.
Escape character is '^]'.

HEAD /sport HTTP/1.1
host: www.nu.nl

HTTP/1.1 200 OK
Server: nginx/1.10.1
Date: Wed, 16 Nov 2016 13:22:19 GMT
Content-Type: text/html
Content-Length: 4699
Last-Modified: Thu, 10 Nov 2016 08:12:54 GMT
Connection: close
ETag: "58242c06-125b"
Expires: Thu, 17 Nov 2016 13:22:19 GMT
Cache-Control: max-age=86400
Accept-Ranges: bytes
```

3.1) If content-length is less than the actual length, the request will successfully send `content-length` of content, and submit the trailing characters as a separate HTTP request, in most cases returning a 400 Bad Request. Otherwise, if content-length is greater than the actual length, the request will not send until the input content reaches the length of `content-length`.

4.1) The browser displays the following text:

```
{
  "authenticated": true, 
  "user": "user"
}
```

4.2)

**HEAD**

```
HEAD /basic-auth/user/passwd HTTP/1.1
host:httpbin.org

HTTP/1.1 401 UNAUTHORIZED
Server: nginx
Date: Wed, 16 Nov 2016 14:00:35 GMT
Content-Length: 0
Connection: keep-alive
Access-Control-Allow-Origin: *
WWW-Authenticate: Basic realm="Fake Realm"
Access-Control-Allow-Credentials: true
```
**HEAD with authorization**

```
HEAD /basic-auth/user/passwd HTTP/1.1
host:httpbin.org
authorization: Basic dXNlcjpwYXNzd2Q=

HTTP/1.1 200 OK
Server: nginx
Date: Wed, 16 Nov 2016 14:06:48 GMT
Content-Type: application/json
Content-Length: 47
Connection: keep-alive
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
```

4.3) No, it is not the same. The new connection is no longer authorized.

```
$telnet httpbin.org 80
Trying 54.175.219.8...
Connected to httpbin.org.
Escape character is '^]'.
GET /basic-auth/user/passwd HTTP/1.1
host:httpbin.org

HTTP/1.1 401 UNAUTHORIZED
Server: nginx
Date: Wed, 16 Nov 2016 14:08:19 GMT
Content-Length: 0
Connection: keep-alive
Access-Control-Allow-Origin: *
WWW-Authenticate: Basic realm="Fake Realm"
Access-Control-Allow-Credentials: true
```

5.1)

- https://todoist.com/
- http://www.any.do/

5.2) 

1. Any.do is very minimal by reducing noise and clutter. Many of the available user actions are represented as icons with minimal text.<br/>
2. Unfortunately however, the minimal icons on Any.do are not self evident and is not self explanatory making the app unintuitive and hard to use.<br/>
3. Todoist uses a very structured layout organizing functionality (todo items, custom labels, and date filters) allowing for a very intuitive user experience. Todoist also uses short labels to make user actions self explanatory.<br/>

6.1)

- Todoist: 60 seconds, 7 clicks, unable to create a reminder. Intuitive.
- Any.do: 90 seconds, 12 clicks, unable to create a reminder. Not intuitive

7.1)

1. Create a todo list item
2. Sort todo list by date
3. Delete a todo list item
4. View todo list items
5. Edit a todo list item
6. Organize todo list items with custom labels
7. View todo list items by label
8. View overdue todo items
9. Complete a todo list item
10. Add notes to a todo list item

8.1)

Name: To Done<br/>
Description: A web app for all your TODO list needs.<br/>
Logo: A checkmark<br/>
Audience: Teens, young adults

8.2)

![alt-text](wireframes.jpg)

8.3)

_On Blackboard, create thread and post design_

- Splash and app designs (2)
- Target audience
- >100 words paragraph on design decisions

9.1)

_Create the HTML documents for the splash and app pages_