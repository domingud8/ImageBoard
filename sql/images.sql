DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS images;


CREATE TABLE images(
    id SERIAL PRIMARY KEY,
    url VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    title VARCHAR NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    image_id INTEGER NOT NULL REFERENCES images (id),
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/spicedling/nQ-EUCvQ0T3eKEB9Nfe207LlewIlU1qk.jpeg',
    'funkychicken',
    'Welcome to Spiced and the Future!',
    'This photo brings back so many great memories.'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/imageboard/jAVZmnxnZ-U95ap2-PLliFFF7TO0KqZm.jpg',
    'funkychicken',
    'Welcome to Spiced and the Future!',
    'This photo brings back so many great memories.'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/imageboard/wg8d94G_HrWdq7bU_2wT6Y6F3zrX-kej.jpg',
    'discoduck',
    'Elvis',
    'We can''t go on together with suspicious minds.'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/imageboard/XCv4AwJdm6QuzjenFPKJocpipRNNMwze.jpg',
    'discoduck',
    'To be or not to be',
    'That is the question.'
);


INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/spicedling/zI2J19a87lkbWAsVnChgLu0G9ldRxVEG.jpg',
    'domingud',
    'Trinidad',
    'This is nice place'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/spicedling/wLXa5uSrQIYTXtKCLTwKPe9JEunlUBSX.jpg',
    'domingud',
    'Vinnales',
    'This is also a nice place'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/spicedling/fmd4BVT2bX-xlGgz6MfKwm2oHkYOjTKm.jpg',
    'domingud',
    'Varadero',
    'This is super nice beach'
);


INSERT INTO comments (username, image_id, text) VALUES (
    'domingud8',
    2,
    'These are just comments on image 2'
);



INSERT INTO comments (username, image_id, text) VALUES (
    'domingud8',
    2,
    'These are just more comments on image 2'
);