# EECS-online

EECS 在线评分系统

[预览地址](http://47.97.215.154:3000/ )

### Background

Introduction to EECS I课程以Python为教学语言，其中每周一次的Software Lab和Nano Quiz考察对原理、算法、编程的掌握程度。本系统为PC端软件，实现对Software Lab和Nano Quiz中每个问题的显示、答案提交和自动判分。

### ENV

##### frontend

- node: >=10.15.0 (LTS)

- react: ^16.8.6
- dva: ^2.6.0-beta.6
- antd: ^3.19.5

##### backend

- django: 2.2.6

### Quick Preview

#### Backend admin dashboard

![image.png](https://i.loli.net/2020/01/12/VtjpKxmPQgUkuz1.png)

#### User login page

![image.png](https://i.loli.net/2020/01/12/reUwKaWvi7l9SuV.png)

#### Teacher page

![image.png](https://i.loli.net/2020/01/12/T3JXLp5mtvPjoSr.png)

![image.png](https://i.loli.net/2020/01/12/4efiWms9GTFQ7L8.png)

![image.png](https://i.loli.net/2020/01/12/TGOEPQN9nL2Rqrc.png)

#### Student page

![image.png](https://i.loli.net/2020/01/12/DNG5jRLdZgeVO1t.png)



![image.png](https://i.loli.net/2020/01/12/pt7RQe2l358NqwU.png)

### Quick Start

- clone repository 

  ```shell
  git clone https://github.com/luhc228/eecs-online.git
  ```

- cd eecs-online

  ```shell
  cd eecs-online
  ```

- install frontend dependencies

  ```shell
  cd eecs-online-client
  npm install
  ```

- start frontend project

  ```shell
  npm start
  ```

- install backend dependencies

  ```shell
  cd eecs-online-server
  pip install -r requirements.txt
  ```
  
- start backend project
  
  ```shell
  python manage.py runserver
  ```

### Contributing

If you have want to contribute to this project, welcome to submit any ideas as [pull requests](https://github.com/luhc228/eecs-online/pulls) or as [GitHub issues](https://github.com/luhc228/eecs-online/issues).
