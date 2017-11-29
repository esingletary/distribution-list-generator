create table person (
	id INT NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(50),
	middle_name VARCHAR(50),
	last_name VARCHAR(50),
	type VARCHAR(10) NOT NULL,
	ssn VARCHAR(11),
	email_address VARCHAR(50),
    PRIMARY KEY (id)
);

create table note (
    note_id INT NOT NULL AUTO_INCREMENT,
    note_title VARCHAR(50),
    note VARCHAR(500),
    PRIMARY KEY (note_id)
);

create table person_notes (
    notes_id INT NOT NULL,
    person_id INT NOT NULL,
    noter_id INT NOT NULL,
    PRIMARY KEY (notes_id, person_id, noter_id),
    FOREIGN KEY (notes_id) REFERENCES note(note_id),
    FOREIGN KEY (person_id) REFERENCES person(id),
    FOREIGN KEY (noter_id) REFERENCES person(id)
);

create table acad_program (
    program_id INT NOT NULL AUTO_INCREMENT,
    program_desc VARCHAR(50),
    total_credits_req INT NOT NULL,
    notes VARCHAR(500),
    PRIMARY KEY (program_id)
);

create table student_acad_programs (
    student_id INT NOT NULL,
    program_id INT NOT NULL,
    start_date date,
    end_date date,
    credits_earned INT,
    PRIMARY KEY (student_id, program_id),
    FOREIGN KEY (student_id) REFERENCES person(id),
    FOREIGN KEY (program_id) REFERENCES acad_program(program_id)
);

create table sport (
    sport_id INT NOT NULL AUTO_INCREMENT,
    sport_desc VARCHAR(50),
    head_coach_id INT,
    notes VARCHAR(500),
    PRIMARY KEY (sport_id),
    FOREIGN KEY (head_coach_id) REFERENCES person(id)
);

create table student_sports (
    person_id INT NOT NULL,
    sport_id INT NOT NULL,
    PRIMARY KEY (person_id, sport_id),
    FOREIGN KEY (person_id) REFERENCES person(id),
    FOREIGN KEY (sport_id) REFERENCES sport(sport_id)
);

create table club (
    club_id INT NOT NULL AUTO_INCREMENT,
    club_desc VARCHAR(50),
    club_advisor_id INT,
    club_president_id INT,
    notes VARCHAR(500),
    PRIMARY KEY (club_id),
    FOREIGN KEY (club_advisor_id) REFERENCES person(id),
    FOREIGN KEY (club_president_id) REFERENCES person(id)
);

create table student_clubs (
    person_id INT NOT NULL,
    club_id INT NOT NULL,
    PRIMARY KEY (person_id, club_id),
    FOREIGN KEY (person_id) REFERENCES person(id),
    FOREIGN KEY (club_id) REFERENCES club(club_id)
);

create table custom_list (
    list_id INT NOT NULL AUTO_INCREMENT,
    list_desc VARCHAR(50),
    list_owner INT NOT NULL,
    notes VARCHAR(500),
    PRIMARY KEY (list_id),
    FOREIGN KEY (list_owner) REFERENCES person(id)
);

create table person_list (
    person_id INT NOT NULL,
    list_id INT NOT NULL,
    PRIMARY KEY (person_id, list_id),
    FOREIGN KEY (person_id) REFERENCES person(id),
    FOREIGN KEY (list_id) REFERENCES custom_list(list_id)
);
