define({ "api": [
  {
    "type": "post",
    "url": "/api/customer/v1",
    "title": "submit customer",
    "version": "1.0.0",
    "name": "submit_customer",
    "description": "<p>submit customer data</p>",
    "group": "customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "name",
            "description": "<p>customer name</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "surveyId",
            "description": "<p>survey id</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "answers",
            "description": "<p>survey answers</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \n success: true, \n message: \"اطلاعات شما با موفقیت ثبت شد\" \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ \n success: false,\n message: \"شما قبلا این نظرسنجی را کامل کردید\" \n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/customer/v1/home.js",
    "groupTitle": "customer"
  },
  {
    "type": "post",
    "url": "/api/survey/v1",
    "title": "create survey",
    "version": "1.0.0",
    "name": "create_survey",
    "description": "<p>create survey</p>",
    "group": "survey",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "surveyId",
            "description": "<p>survey surveyId</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "name",
            "description": "<p>survey name</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "ownerId",
            "description": "<p>owner ownerId</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "questions",
            "description": "<p>survey questions</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \n success: true, \n message: \"نظرسنجی با موفقیت ایجاد شد\" \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ \n success: false,\n message: \"نظرسنجی با این شناسه قبلا ایجاد شده است\" \n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/survey/v1/home.js",
    "groupTitle": "survey"
  },
  {
    "type": "get",
    "url": "/api/survey/v1/:surveyId/:customer",
    "title": "get survey",
    "version": "1.0.0",
    "name": "get_survey.hbs_file",
    "description": "<p>get survey.hbs</p>",
    "group": "survey",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "surveyId",
            "description": "<p>survey surveyId</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "customer",
            "description": "<p>customer customerName</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ \n success: false,\n message: \"شما این نظرسنجی را تکمیل کرده اید\" \n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/survey/v1/home.js",
    "groupTitle": "survey"
  },
  {
    "type": "delete",
    "url": "/api/survey/v1/remove",
    "title": "remove survey",
    "version": "1.0.0",
    "name": "remove_survey",
    "description": "<p>remove survey</p>",
    "group": "survey",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "surveyId",
            "description": "<p>survey surveyId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \n success: true,\n message: \"حذف نظرسنجی با موفقیت انجام شد\" \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ \n success: false, \n message: \"نظرسنجی پیدا نشد\" \n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/survey/v1/home.js",
    "groupTitle": "survey"
  },
  {
    "type": "put",
    "url": "/api/survey/v1/toggle",
    "title": "toggle survey",
    "version": "1.0.0",
    "name": "toggle_survey",
    "description": "<p>toggle survey</p>",
    "group": "survey",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "surveyId",
            "description": "<p>survey surveyId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \n success: true,\n message: \"با موفقیت انجام شد\" \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ \n success: false,\n message: \"نظرسنجی پیدا نشد\" \n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/survey/v1/home.js",
    "groupTitle": "survey"
  },
  {
    "type": "post",
    "url": "/api/user/v1/login",
    "title": "login",
    "version": "1.0.0",
    "name": "login",
    "description": "<p>login user</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "username",
            "description": "<p>user username</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "password",
            "description": "<p>user password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \n success: true, \n message: \"با موفقیت وارذ شذیذ\" \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ \n success: false, \n message: \"نام کاربری یا رمز عبور صحیح نمیباشد\" \n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/home.js",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/v1",
    "title": "register",
    "version": "1.0.0",
    "name": "register",
    "description": "<p>resgister user</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "username",
            "description": "<p>user username</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "password",
            "description": "<p>user password</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "name",
            "description": "<p>name</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "family",
            "description": "<p>family</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "email",
            "description": "<p>email</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "mobile",
            "description": "<p>mobile { success: true, message: &quot;ثبت نام با موفقیت انجام شد&quot; }</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ \n success: false, \n message: \"شماره موبایل برای حساب کاربری دیگری استفاده شده است\" \n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user/v1/home.js",
    "groupTitle": "user"
  }
] });
