<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
    <head>
        <title>Spring Boot에서 JSP 출력</title>
        <meta charset="UTF-8">
    </head>
    <body>
        메시지:<%=request.getAttribute("message")%>
    </body>
</html>