var Sequelize = require('sequelize');
var pg = require('pg');
var db = new Sequelize('postgres://localhost:5432/wikistack');


var Page = db.define('pages', 
    {
        title: {
            type: Sequelize.STRING, 
            allowNull: false
        },
        urlTitle: {
            type: Sequelize.STRING, 
            allowNull: false
        },
        content: {
            type: Sequelize.TEXT, 
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('open', 'closed')
        },
        date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        author: {
            type: Sequelize.TEXT,
            allowNull: false
        }

    }, 

    {
        getterMethods: {
            route(){
                return '/wiki/' + this.getDataValue('urlTitle');
            }
        }
    }
);

function generateUrlTitle (title) {
  if (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generates random 5 letter string
    return Math.random().toString(36).substring(2, 7);
  }
}

Page.hook('beforeValidate', (page, options) => {
  page.urlTitle = generateUrlTitle(page.title);
});


var User = db.define('user', {
    name: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    email: {
        type: Sequelize.STRING, 
        allowNull: false, 
        validate: {
            isEmail: true
        }

    }
});

module.exports = {
    db: db,
    Page: Page,
    User: User
};