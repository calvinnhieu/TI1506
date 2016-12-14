#4
##4.2
1: input

`SELECT * FROM todo.ToDoList WHERE OWNER = 1;`
output:

```
mysql> mysql> SELECT * FROM todo.ToDoList WHERE OWNER = 1;
+----+--------+---------------------+-------+----------+
| Id | Name   | CreationDate        | Owner | IsPublic |
+----+--------+---------------------+-------+----------+
|  1 | School | 2013-01-25 12:35:00 |     1 |        0 |
|  2 | Work   | 2014-02-14 00:00:00 |     1 |        0 |
+----+--------+---------------------+-------+----------+
```


2: input

`SELECT * FROM todo.ToDoItem WHERE ToDoListID = 1;`
output:

```
mysql> SELECT * FROM todo.ToDoItem WHERE ToDoListID = 1;
+----+------------------------------+------------------------------------------------------------------+---------------------+---------------------+-----------+---------------------+----------+------------+------------+
| Id | Title                        | Text                                                             | CreationDate        | DueDate             | Completed | CompletionDate      | Priority | ToDoListID | ParentToDo |
+----+------------------------------+------------------------------------------------------------------+---------------------+---------------------+-----------+---------------------+----------+------------+------------+
|  1 | Do assignment 1              | Finish assignment one before the assessment time                 | 2014-11-17 12:56:12 | 2014-11-20 23:59:59 |         1 | 2014-11-20 23:55:15 |        3 |          1 |       NULL |
|  2 | Do telnet exercises          | Do all telnet exercises and understand what is happening and why | 2014-11-18 22:51:48 | 2014-11-20 23:59:59 |         1 | 2014-11-18 13:35:48 |        3 |          1 |          1 |
|  3 | Do HTML part of assignment 1 | Do the html part of the first assignment: code and design        | 2014-11-18 15:26:58 | 2014-11-20 23:59:59 |         1 | 2014-11-19 15:59:36 |        3 |          1 |          1 |
| 17 | Assignment 2                 | Fix all parts of assignment 2 for webdata                        | 2014-11-25 12:22:45 | 2014-11-27 15:45:00 |         1 | 2014-11-27 12:52:33 |        3 |          1 |       NULL |
| 18 | First part of 2              | Do the first part of the second assignment                       | 2014-11-25 12:23:15 | 2014-11-27 15:45:00 |         1 | 2014-11-26 09:12:52 |        3 |          1 |         17 |
| 19 | Second part of 2             | Do the second part of the second assignment                      | 2014-11-25 12:25:55 | 2014-11-27 15:45:00 |         1 | 2014-11-27 12:52:33 |        3 |          1 |         17 |
| 20 | Learn for Midterm            | For webdata midterm                                              | 2014-12-01 14:55:32 | 2014-12-09 09:00:00 |         1 | 2014-11-08 22:55:15 |        1 |          1 |       NULL |
| 22 | Assigment 3 and 4            | For webdata                                                      | 2014-12-02 16:11:25 | 2014-12-18 12:00:00 |         0 | NULL                |        3 |          1 |       NULL |
| 23 | Assignemnt 3 part 1          | part 1 for A3                                                    | 2014-12-02 16:12:11 | 2014-12-18 12:00:00 |         1 | 2014-12-14 12:55:34 |        3 |          1 |         22 |
| 24 | Assignment 3 part 2          | part 2 for A3                                                    | 2014-12-02 16:12:55 | 2014-12-18 12:00:00 |         1 | 2014-12-14 18:32:56 |        3 |          1 |         22 |
| 25 | Assignment 4 part 1          | part 1 for A4                                                    | 2014-12-02 16:14:25 | 2014-12-18 12:00:00 |         1 | 2014-12-16 13:25:56 |        3 |          1 |         22 |
| 26 | Assignment 4 part 2          | part 2 for A4                                                    | 2014-12-02 16:15:45 | 2014-12-18 12:00:00 |         0 | NULL                |        3 |          1 |         22 |
| 27 | Create database for students | So they can practice with the assignments                        | 2014-12-12 15:48:55 | 2014-12-16 23:59:59 |         1 | 2014-12-16 15:22:45 |        3 |          1 |       NULL |
+----+------------------------------+------------------------------------------------------------------+---------------------+---------------------+-----------+---------------------+----------+------------+------------+
13 rows in set (0,00 sec)
```


3: input

`SELECT * FROM todo.ToDoItem WHERE ToDoListID = 1 LIMIT 5, 10;`
Output:

```
mysql> SELECT * FROM todo.ToDoItem WHERE ToDoListID = 1 LIMIT 5, 10;
+----+------------------------------+---------------------------------------------+---------------------+---------------------+-----------+---------------------+----------+------------+------------+
| Id | Title                        | Text                                        | CreationDate        | DueDate             | Completed | CompletionDate      | Priority | ToDoListID | ParentToDo |
+----+------------------------------+---------------------------------------------+---------------------+---------------------+-----------+---------------------+----------+------------+------------+
| 19 | Second part of 2             | Do the second part of the second assignment | 2014-11-25 12:25:55 | 2014-11-27 15:45:00 |         1 | 2014-11-27 12:52:33 |        3 |          1 |         17 |
| 20 | Learn for Midterm            | For webdata midterm                         | 2014-12-01 14:55:32 | 2014-12-09 09:00:00 |         1 | 2014-11-08 22:55:15 |        1 |          1 |       NULL |
| 22 | Assigment 3 and 4            | For webdata                                 | 2014-12-02 16:11:25 | 2014-12-18 12:00:00 |         0 | NULL                |        3 |          1 |       NULL |
| 23 | Assignemnt 3 part 1          | part 1 for A3                               | 2014-12-02 16:12:11 | 2014-12-18 12:00:00 |         1 | 2014-12-14 12:55:34 |        3 |          1 |         22 |
| 24 | Assignment 3 part 2          | part 2 for A3                               | 2014-12-02 16:12:55 | 2014-12-18 12:00:00 |         1 | 2014-12-14 18:32:56 |        3 |          1 |         22 |
| 25 | Assignment 4 part 1          | part 1 for A4                               | 2014-12-02 16:14:25 | 2014-12-18 12:00:00 |         1 | 2014-12-16 13:25:56 |        3 |          1 |         22 |
| 26 | Assignment 4 part 2          | part 2 for A4                               | 2014-12-02 16:15:45 | 2014-12-18 12:00:00 |         0 | NULL                |        3 |          1 |         22 |
| 27 | Create database for students | So they can practice with the assignments   | 2014-12-12 15:48:55 | 2014-12-16 23:59:59 |         1 | 2014-12-16 15:22:45 |        3 |          1 |       NULL |
+----+------------------------------+---------------------------------------------+---------------------+---------------------+-----------+---------------------+----------+------------+------------+
8 rows in set (0,00 sec)
```

4: input

`SELECT * FROM todo.ToDoItem WHERE ToDoListID = 1 AND CreationDate > '2014-12-02 00:00:00' LIMIT 0, 10;`
output:

```
mysql> SELECT * FROM todo.ToDoItem WHERE ToDoListID = 1 AND CreationDate > '2014-12-02 00:00:00' LIMIT 0, 10;
+----+------------------------------+-------------------------------------------+---------------------+---------------------+-----------+---------------------+----------+------------+------------+
| Id | Title                        | Text                                      | CreationDate        | DueDate             | Completed | CompletionDate      | Priority | ToDoListID | ParentToDo |
+----+------------------------------+-------------------------------------------+---------------------+---------------------+-----------+---------------------+----------+------------+------------+
| 22 | Assigment 3 and 4            | For webdata                               | 2014-12-02 16:11:25 | 2014-12-18 12:00:00 |         0 | NULL                |        3 |          1 |       NULL |
| 23 | Assignemnt 3 part 1          | part 1 for A3                             | 2014-12-02 16:12:11 | 2014-12-18 12:00:00 |         1 | 2014-12-14 12:55:34 |        3 |          1 |         22 |
| 24 | Assignment 3 part 2          | part 2 for A3                             | 2014-12-02 16:12:55 | 2014-12-18 12:00:00 |         1 | 2014-12-14 18:32:56 |        3 |          1 |         22 |
| 25 | Assignment 4 part 1          | part 1 for A4                             | 2014-12-02 16:14:25 | 2014-12-18 12:00:00 |         1 | 2014-12-16 13:25:56 |        3 |          1 |         22 |
| 26 | Assignment 4 part 2          | part 2 for A4                             | 2014-12-02 16:15:45 | 2014-12-18 12:00:00 |         0 | NULL                |        3 |          1 |         22 |
| 27 | Create database for students | So they can practice with the assignments | 2014-12-12 15:48:55 | 2014-12-16 23:59:59 |         1 | 2014-12-16 15:22:45 |        3 |          1 |       NULL |
+----+------------------------------+-------------------------------------------+---------------------+---------------------+-----------+---------------------+----------+------------+------------+
6 rows in set (0,00 sec)

```

```
mysql> SELECT * FROM todo.ToDoItem WHERE ToDoListID = 1 AND priority = 3 LIMIT 0, 10;
+----+------------------------------+------------------------------------------------------------------+---------------------+---------------------+-----------+---------------------+----------+------------+------------+
| Id | Title                        | Text                                                             | CreationDate        | DueDate             | Completed | CompletionDate      | Priority | ToDoListID | ParentToDo |
+----+------------------------------+------------------------------------------------------------------+---------------------+---------------------+-----------+---------------------+----------+------------+------------+
|  1 | Do assignment 1              | Finish assignment one before the assessment time                 | 2014-11-17 12:56:12 | 2014-11-20 23:59:59 |         1 | 2014-11-20 23:55:15 |        3 |          1 |       NULL |
|  2 | Do telnet exercises          | Do all telnet exercises and understand what is happening and why | 2014-11-18 22:51:48 | 2014-11-20 23:59:59 |         1 | 2014-11-18 13:35:48 |        3 |          1 |          1 |
|  3 | Do HTML part of assignment 1 | Do the html part of the first assignment: code and design        | 2014-11-18 15:26:58 | 2014-11-20 23:59:59 |         1 | 2014-11-19 15:59:36 |        3 |          1 |          1 |
| 17 | Assignment 2                 | Fix all parts of assignment 2 for webdata                        | 2014-11-25 12:22:45 | 2014-11-27 15:45:00 |         1 | 2014-11-27 12:52:33 |        3 |          1 |       NULL |
| 18 | First part of 2              | Do the first part of the second assignment                       | 2014-11-25 12:23:15 | 2014-11-27 15:45:00 |         1 | 2014-11-26 09:12:52 |        3 |          1 |         17 |
| 19 | Second part of 2             | Do the second part of the second assignment                      | 2014-11-25 12:25:55 | 2014-11-27 15:45:00 |         1 | 2014-11-27 12:52:33 |        3 |          1 |         17 |
| 22 | Assigment 3 and 4            | For webdata                                                      | 2014-12-02 16:11:25 | 2014-12-18 12:00:00 |         0 | NULL                |        3 |          1 |       NULL |
| 23 | Assignemnt 3 part 1          | part 1 for A3                                                    | 2014-12-02 16:12:11 | 2014-12-18 12:00:00 |         1 | 2014-12-14 12:55:34 |        3 |          1 |         22 |
| 24 | Assignment 3 part 2          | part 2 for A3                                                    | 2014-12-02 16:12:55 | 2014-12-18 12:00:00 |         1 | 2014-12-14 18:32:56 |        3 |          1 |         22 |
| 25 | Assignment 4 part 1          | part 1 for A4                                                    | 2014-12-02 16:14:25 | 2014-12-18 12:00:00 |         1 | 2014-12-16 13:25:56 |        3 |          1 |         22 |
+----+------------------------------+------------------------------------------------------------------+---------------------+---------------------+-----------+---------------------+----------+------------+------------+
10 rows in set (0,00 sec)
```

```
mysql> SELECT * FROM todo.ToDoItem WHERE ToDoListID = 1 AND Completed = 1 LIMIT 0, 10;
+----+------------------------------+------------------------------------------------------------------+---------------------+---------------------+-----------+---------------------+----------+------------+------------+
| Id | Title                        | Text                                                             | CreationDate        | DueDate             | Completed | CompletionDate      | Priority | ToDoListID | ParentToDo |
+----+------------------------------+------------------------------------------------------------------+---------------------+---------------------+-----------+---------------------+----------+------------+------------+
|  1 | Do assignment 1              | Finish assignment one before the assessment time                 | 2014-11-17 12:56:12 | 2014-11-20 23:59:59 |         1 | 2014-11-20 23:55:15 |        3 |          1 |       NULL |
|  2 | Do telnet exercises          | Do all telnet exercises and understand what is happening and why | 2014-11-18 22:51:48 | 2014-11-20 23:59:59 |         1 | 2014-11-18 13:35:48 |        3 |          1 |          1 |
|  3 | Do HTML part of assignment 1 | Do the html part of the first assignment: code and design        | 2014-11-18 15:26:58 | 2014-11-20 23:59:59 |         1 | 2014-11-19 15:59:36 |        3 |          1 |          1 |
| 17 | Assignment 2                 | Fix all parts of assignment 2 for webdata                        | 2014-11-25 12:22:45 | 2014-11-27 15:45:00 |         1 | 2014-11-27 12:52:33 |        3 |          1 |       NULL |
| 18 | First part of 2              | Do the first part of the second assignment                       | 2014-11-25 12:23:15 | 2014-11-27 15:45:00 |         1 | 2014-11-26 09:12:52 |        3 |          1 |         17 |
| 19 | Second part of 2             | Do the second part of the second assignment                      | 2014-11-25 12:25:55 | 2014-11-27 15:45:00 |         1 | 2014-11-27 12:52:33 |        3 |          1 |         17 |
| 20 | Learn for Midterm            | For webdata midterm                                              | 2014-12-01 14:55:32 | 2014-12-09 09:00:00 |         1 | 2014-11-08 22:55:15 |        1 |          1 |       NULL |
| 23 | Assignemnt 3 part 1          | part 1 for A3                                                    | 2014-12-02 16:12:11 | 2014-12-18 12:00:00 |         1 | 2014-12-14 12:55:34 |        3 |          1 |         22 |
| 24 | Assignment 3 part 2          | part 2 for A3                                                    | 2014-12-02 16:12:55 | 2014-12-18 12:00:00 |         1 | 2014-12-14 18:32:56 |        3 |          1 |         22 |
| 25 | Assignment 4 part 1          | part 1 for A4                                                    | 2014-12-02 16:14:25 | 2014-12-18 12:00:00 |         1 | 2014-12-16 13:25:56 |        3 |          1 |         22 |
+----+------------------------------+------------------------------------------------------------------+---------------------+---------------------+-----------+---------------------+----------+------------+------------+
10 rows in set (0,00 sec)

```


5: input

`SELECT * FROM todo.ToDoItem WHERE ParentToDo = 22;`
output:

```
mysql> SELECT * FROM todo.ToDoItem WHERE ParentToDo = 22;
+----+----------------------+---------------+---------------------+---------------------+-----------+---------------------+----------+------------+------------+
| Id | Title                | Text          | CreationDate        | DueDate             | Completed | CompletionDate      | Priority | ToDoListID | ParentToDo |
+----+----------------------+---------------+---------------------+---------------------+-----------+---------------------+----------+------------+------------+
| 23 | Assignemnt 3 part 1  | part 1 for A3 | 2014-12-02 16:12:11 | 2014-12-18 12:00:00 |         1 | 2014-12-14 12:55:34 |        3 |          1 |         22 |
| 24 | Assignment 3 part 2  | part 2 for A3 | 2014-12-02 16:12:55 | 2014-12-18 12:00:00 |         1 | 2014-12-14 18:32:56 |        3 |          1 |         22 |
| 25 | Assignment 4 part 1  | part 1 for A4 | 2014-12-02 16:14:25 | 2014-12-18 12:00:00 |         1 | 2014-12-16 13:25:56 |        3 |          1 |         22 |
| 26 | Assignment 4 part 2  | part 2 for A4 | 2014-12-02 16:15:45 | 2014-12-18 12:00:00 |         0 | NULL                |        3 |          1 |         22 |
+----+----------------------+---------------+---------------------+---------------------+-----------+---------------------+----------+------------+------------+
4 rows in set (0,00 sec)

```

6: input

`Select Text, ToDoId from todo.Tag T JOIN todo.ItemTag IT on T.id = IT.TagId HAVING ToDoId = 1;`
output:

```
mysql> Select Text, ToDoId from todo.Tag T JOIN todo.ItemTag IT on T.id = IT.TagId HAVING ToDoId = 1;
+---------+--------+
| Text    | ToDoId |
+---------+--------+
| webdata |      1 |
| school  |      1 |
+---------+--------+
2 rows in set (0,00 sec)

```

7: input

`SELECT DISTINCT ToDoListId, TagId FROM todo.ToDoItem TDI JOIN todo.ItemTag IT ON TDI.Id = IT.ToDoId HAVING TagId = 3;
`
output:

```
mysql> SELECT DISTINCT ToDoListId, TagId FROM todo.ToDoItem TDI JOIN todo.ItemTag IT ON TDI.Id = IT.ToDoId HAVING TagId = 3;
+------------+-------+
| ToDoListId | TagId |
+------------+-------+
|          1 |     3 |
|          3 |     3 |
+------------+-------+
2 rows in set (0,01 sec)

```

8: input

```
SELECT TagId, COUNT(*) as Total, completed 
FROM todo.ToDoItem TDI LEFT JOIN todo.ItemTag IT ON TDI.Id = IT.ToDoId 
GROUP BY IT.TagId 
HAVING completed = 1;
```
output:

```
mysql> SELECT TagId, COUNT(*) as Total, completed FROM todo.ToDoItem TDI LEFT JOIN todo.ItemTag IT ON TDI.Id = IT.ToDoId GROUP BY IT.TagId HAVING completed = 1;
+-------+-------+-----------+
| TagId | Total | completed |
+-------+-------+-----------+
|     1 |    13 |         1 |
|     2 |     3 |         1 |
|     3 |    19 |         1 |
+-------+-------+-----------+
3 rows in set (0.01 sec)

mysql> SELECT TagId, COUNT(*) as Total, completed FROM todo.ToDoItem TDI LEFT JOIN todo.ItemTag IT ON TDI.Id = IT.ToDoId GROUP BY IT.TagId HAVING completed = 0;
+-------+-------+-----------+
| TagId | Total | completed |
+-------+-------+-----------+
|     4 |     2 |         0 |
|     5 |     8 |         0 |
+-------+-------+-----------+
2 rows in set (0.00 sec)

```

9: input
Always 0, no ToDo's are completed this year

```
SELECT YEARWEEK(CompletionDate) as yearweek, COUNT(*) as count 
FROM todo.ToDoItem 
WHERE YEARWEEK(CompletionDate) = 201601;
```

output:

```
mysql> SELECT YEARWEEK(CompletionDate) as yearweek, COUNT(*) as count FROM todo.ToDoItem WHERE YEARWEEK(CompletionDate) = 201601;
+----------+-------+
| yearweek | count |
+----------+-------+
|     NULL |     0 |
+----------+-------+
1 row in set (0.00 sec)
```

10: input

```
SELECT Title, TagId, DATEDIFF(DueDate,CompletionDate) as datedif, Completed 
FROM todo.ToDoItem TDI LEFT JOIN todo.ItemTag IT ON TDI.Id = IT.ToDoId 
HAVING Completed = 1 AND TagId = 1 
ORDER BY datedif ASC LIMIT 0,10;

SELECT Title, TagId, DATEDIFF(DueDate,CompletionDate) as datedif, Completed FROM todo.ToDoItem TDI LEFT JOIN todo.ItemTag IT ON TDI.Id = IT.ToDoId HAVING Completed = 1 AND TagId = 2 ORDER BY datedif ASC LIMIT 0,10;
SELECT Title, TagId, DATEDIFF(DueDate,CompletionDate) as datedif, Completed FROM todo.ToDoItem TDI LEFT JOIN todo.ItemTag IT ON TDI.Id = IT.ToDoId HAVING Completed = 1 AND TagId = 3 ORDER BY datedif ASC LIMIT 0,10;
SELECT Title, TagId, DATEDIFF(DueDate,CompletionDate) as datedif, Completed FROM todo.ToDoItem TDI LEFT JOIN todo.ItemTag IT ON TDI.Id = IT.ToDoId HAVING Completed = 1 AND TagId = 4 ORDER BY datedif ASC LIMIT 0,10;
SELECT Title, TagId, DATEDIFF(DueDate,CompletionDate) as datedif, Completed FROM todo.ToDoItem TDI LEFT JOIN todo.ItemTag IT ON TDI.Id = IT.ToDoId HAVING Completed = 1 AND TagId = 5 ORDER BY datedif ASC LIMIT 0,10;


```
output:

```
mysql> SELECT Title, TagId, DATEDIFF(DueDate,CompletionDate) as datedif, Completed FROM todo.ToDoItem TDI LEFT JOIN todo.ItemTag IT ON TDI.Id = IT.ToDoId HAVING Completed = 1 AND TagId = 1 ORDER BY datedif ASC LIMIT 0,10;
+------------------------------+-------+---------+-----------+
| Title                        | TagId | datedif | Completed |
+------------------------------+-------+---------+-----------+
| Do assignment 1              |     1 |       0 |         1 |
| Assignment 2                 |     1 |       0 |         1 |
| Second part of 2             |     1 |       0 |         1 |
| Create database for students |     1 |       0 |         1 |
| Do HTML part of assignment 1 |     1 |       1 |         1 |
| First part of 2              |     1 |       1 |         1 |
| Do telnet exercises          |     1 |       2 |         1 |
| Assignment 4 part 1          |     1 |       2 |         1 |
| Assignemnt 3 part 1          |     1 |       4 |         1 |
| Assignment 3 part 2          |     1 |       4 |         1 |
+------------------------------+-------+---------+-----------+
10 rows in set (0.00 sec)

mysql> SELECT Title, TagId, DATEDIFF(DueDate,CompletionDate) as datedif, Completed FROM todo.ToDoItem TDI LEFT JOIN todo.ItemTag IT ON TDI.Id = IT.ToDoId HAVING Completed = 1 AND TagId = 2 ORDER BY datedif ASC LIMIT 0,10;
+---------+-------+---------+-----------+
| Title   | TagId | datedif | Completed |
+---------+-------+---------+-----------+
| Leg day |     2 |       0 |         1 |
+---------+-------+---------+-----------+
1 row in set (0.00 sec)

mysql> SELECT Title, TagId, DATEDIFF(DueDate,CompletionDate) as datedif, Completed FROM todo.ToDoItem TDI LEFT JOIN todo.ItemTag IT ON TDI.Id = IT.ToDoId HAVING Completed = 1 AND TagId = 3 ORDER BY datedif ASC LIMIT 0,10;
+------------------------------+-------+---------+-----------+
| Title                        | TagId | datedif | Completed |
+------------------------------+-------+---------+-----------+
| Do assignment 1              |     3 |       0 |         1 |
| Assignment 2                 |     3 |       0 |         1 |
| Second part of 2             |     3 |       0 |         1 |
| Create database for students |     3 |       0 |         1 |
| Do HTML part of assignment 1 |     3 |       1 |         1 |
| First part of 2              |     3 |       1 |         1 |
| Do telnet exercises          |     3 |       2 |         1 |
| Assignment 4 part 1          |     3 |       2 |         1 |
| Finish chapter 2             |     3 |       4 |         1 |
| Assignemnt 3 part 1          |     3 |       4 |         1 |
+------------------------------+-------+---------+-----------+
10 rows in set (0.00 sec)

mysql> SELECT Title, TagId, DATEDIFF(DueDate,CompletionDate) as datedif, Completed FROM todo.ToDoItem TDI LEFT JOIN todo.ItemTag IT ON TDI.Id = IT.ToDoId HAVING Completed = 1 AND TagId = 4 ORDER BY datedif ASC LIMIT 0,10;
Empty set (0.00 sec)

mysql> SELECT Title, TagId, DATEDIFF(DueDate,CompletionDate) as datedif, Completed FROM todo.ToDoItem TDI LEFT JOIN todo.ItemTag IT ON TDI.Id = IT.ToDoId HAVING Completed = 1 AND TagId = 5 ORDER BY datedif ASC LIMIT 0,10;
+------------------------------+-------+---------+-----------+
| Title                        | TagId | datedif | Completed |
+------------------------------+-------+---------+-----------+
| Leg day                      |     5 |       0 |         1 |
| Visit grandma                |     5 |       0 |         1 |
| Create database for students |     5 |       0 |         1 |
| Vacuum                       |     5 |       2 |         1 |
+------------------------------+-------+---------+-----------+
4 rows in set (0.00 sec)

```

11: ??????
input

`SELECT ToDoId, TagId, count(*) as count FROM todo.ItemTag Group By TodoId, TagId;`
output:

```

```

12: input

```
SELECT AVG(datediff(I.CompletionDate, I.CreationDate)) as Average 
FROM todo.ToDoList L JOIN todo.ToDoItem I ON L.Id = I.ToDoListId 
WHERE L.Id =3 AND I.Completed = 1;
```

output:

```
mysql> SELECT AVG(datediff(I.CompletionDate, I.CreationDate)) as Average FROM todo.ToDoList L JOIN todo.ToDoItem I ON L.Id = I.ToDoListId WHERE L.Id =3 AND I.Completed = 1;
+---------+
| Average |
+---------+
| 34.3333 |
+---------+


```

13: input

```
SELECT I.Title, datediff(I.CompletionDate, I.CreationDate) as Difference 
FROM todo.ToDoList L JOIN todo.ToDoItem I ON L.Id = I.ToDoListId 
WHERE L.Id =3 AND I.Completed = 1  
HAVING Difference > (SELECT AVG(datediff(I.CompletionDate, I.CreationDate)) as Average FROM todo.ToDoList L JOIN todo.ToDoItem I ON L.Id = I.ToDoListId WHERE L.Id =3 AND I.Completed = 1 );
```

output:

```
mysql> SELECT I.Title, datediff(I.CompletionDate, I.CreationDate) as Difference FROM todo.ToDoList L JOIN todo.ToDoItem I ON L.Id = I.ToDoListId WHERE L.Id =3 AND I.Completed = 1 GROUP BY Title Having Difference > (SELECT AVG(datediff(I.CompletionDate, I.CreationDate)) as Average FROM todo.ToDoList L JOIN todo.ToDoItem I ON L.Id = I.ToDoListId WHERE L.Id =3 AND I.Completed = 1 );
+------------------+------------+
| Title            | Difference |
+------------------+------------+
| Finish chapter 1 |         60 |
| Finish chapter 2 |         41 |
+------------------+------------+
2 rows in set (0.00 sec)
```

