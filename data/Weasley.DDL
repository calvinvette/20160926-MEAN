-- drop database weasley;

-- drop table customer;
-- create or replace Weasley;=
create or replace database weasley;

use weasley;

create table customer (
    customerId BIGINT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(25),
    lastName VARCHAR(25),
    email VARCHAR(50),
    phoneNumber VARCHAR(20)
);

insert into customer (firstName, lastName, phoneNumber, email)
  values('Harry', 'Potter', '+44 0206 481-1358', 'harry@hogwarts.ac.uk');
insert into customer (firstName, lastName, phoneNumber, email)
  values('Ron', 'Weasley', '+44 0206 481-1328', 'ron@hogwarts.ac.uk');
insert into customer (firstName, lastName, phoneNumber, email)
  values('Hermione', 'Granger', '+44 0206 481-1411', 'hermione@hogwarts.ac.uk');


create table address (
addressId BIGINT AUTO_INCREMENT PRIMARY KEY,
line1 VARCHAR(30),
line2 VARCHAR(30),
city VARCHAR(30),
stateProvince VARCHAR(30),
countryCode VARCHAR(2),
postalCode VARCHAR(30),
owner BIGINT
);

alter table Address add constraint fk_addressowner foreign key(owner) references customer(customerId);

-- alter table Address add constraint fk_address_owner foreign key(owner) references customer(customerId)

insert into address (line1, line2, city, stateProvince, countryCode, postalCode)
  values('#4 Privet Drive', 'Cupboard under the stairs', 'Little Whinging', 'Surrey', 'EN', '1401XX');
insert into address (line1, line2, city, stateProvince, countryCode, postalCode)
  values('Gryffindor Boys Tower', '5th year', 'Hogsmeade', 'Hogsmead', 'SC', '38401XX');


