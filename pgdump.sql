--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8
-- Dumped by pg_dump version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: alpinehut_db; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA alpinehut_db;


ALTER SCHEMA alpinehut_db OWNER TO postgres;

--
-- Name: auth_role; Type: TYPE; Schema: alpinehut_db; Owner: postgres
--

CREATE TYPE alpinehut_db.auth_role AS ENUM (
    'regular',
    'admin'
);


ALTER TYPE alpinehut_db.auth_role OWNER TO postgres;

--
-- Name: object_3d_references_activein; Type: TYPE; Schema: alpinehut_db; Owner: postgres
--

CREATE TYPE alpinehut_db.object_3d_references_activein AS ENUM (
    'floor1Part',
    'floor2Part',
    'verandaPart',
    'floor3Part',
    'fireplacePart'
);


ALTER TYPE alpinehut_db.object_3d_references_activein OWNER TO postgres;

--
-- Name: object_3d_references_type; Type: TYPE; Schema: alpinehut_db; Owner: postgres
--

CREATE TYPE alpinehut_db.object_3d_references_type AS ENUM (
    'point',
    'custom',
    'box'
);


ALTER TYPE alpinehut_db.object_3d_references_type OWNER TO postgres;

--
-- Name: peripheral_groups_type; Type: TYPE; Schema: alpinehut_db; Owner: postgres
--

CREATE TYPE alpinehut_db.peripheral_groups_type AS ENUM (
    'heating_system'
);


ALTER TYPE alpinehut_db.peripheral_groups_type OWNER TO postgres;

--
-- Name: peripherals_interface; Type: TYPE; Schema: alpinehut_db; Owner: postgres
--

CREATE TYPE alpinehut_db.peripherals_interface AS ENUM (
    '1wire',
    'i2c',
    'spi',
    'direct'
);


ALTER TYPE alpinehut_db.peripherals_interface OWNER TO postgres;

--
-- Name: peripherals_type; Type: TYPE; Schema: alpinehut_db; Owner: postgres
--

CREATE TYPE alpinehut_db.peripherals_type AS ENUM (
    'Sensor',
    'Heater'
);


ALTER TYPE alpinehut_db.peripherals_type OWNER TO postgres;

--
-- Name: profile_authorizations_access; Type: TYPE; Schema: alpinehut_db; Owner: postgres
--

CREATE TYPE alpinehut_db.profile_authorizations_access AS ENUM (
    'Read',
    'Setup',
    'Activate'
);


ALTER TYPE alpinehut_db.profile_authorizations_access OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: auth; Type: TABLE; Schema: alpinehut_db; Owner: postgres
--

CREATE TABLE alpinehut_db.auth (
    id bigint NOT NULL,
    login character varying(255),
    password character varying(255),
    profileid bigint,
    email character varying(255),
    salt character varying(255),
    role alpinehut_db.auth_role DEFAULT 'regular'::alpinehut_db.auth_role,
    status smallint DEFAULT '0'::smallint,
    sessionid character varying(255)
);


ALTER TABLE alpinehut_db.auth OWNER TO postgres;

--
-- Name: auth_id_seq; Type: SEQUENCE; Schema: alpinehut_db; Owner: postgres
--

CREATE SEQUENCE alpinehut_db.auth_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE alpinehut_db.auth_id_seq OWNER TO postgres;

--
-- Name: auth_id_seq; Type: SEQUENCE OWNED BY; Schema: alpinehut_db; Owner: postgres
--

ALTER SEQUENCE alpinehut_db.auth_id_seq OWNED BY alpinehut_db.auth.id;


--
-- Name: history; Type: TABLE; Schema: alpinehut_db; Owner: postgres
--

CREATE TABLE alpinehut_db.history (
    id bigint NOT NULL,
    entitytype character varying(16),
    entityid bigint,
    data json,
    created timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE alpinehut_db.history OWNER TO postgres;

--
-- Name: history_id_seq; Type: SEQUENCE; Schema: alpinehut_db; Owner: postgres
--

CREATE SEQUENCE alpinehut_db.history_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE alpinehut_db.history_id_seq OWNER TO postgres;

--
-- Name: history_id_seq; Type: SEQUENCE OWNED BY; Schema: alpinehut_db; Owner: postgres
--

ALTER SEQUENCE alpinehut_db.history_id_seq OWNED BY alpinehut_db.history.id;


--
-- Name: object_3d_references; Type: TABLE; Schema: alpinehut_db; Owner: postgres
--

CREATE TABLE alpinehut_db.object_3d_references (
    id bigint NOT NULL,
    type alpinehut_db.object_3d_references_type DEFAULT 'custom'::alpinehut_db.object_3d_references_type,
    config json,
    activein alpinehut_db.object_3d_references_activein DEFAULT 'floor1Part'::alpinehut_db.object_3d_references_activein
);


ALTER TABLE alpinehut_db.object_3d_references OWNER TO postgres;

--
-- Name: object_3d_references_id_seq; Type: SEQUENCE; Schema: alpinehut_db; Owner: postgres
--

CREATE SEQUENCE alpinehut_db.object_3d_references_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE alpinehut_db.object_3d_references_id_seq OWNER TO postgres;

--
-- Name: object_3d_references_id_seq; Type: SEQUENCE OWNED BY; Schema: alpinehut_db; Owner: postgres
--

ALTER SEQUENCE alpinehut_db.object_3d_references_id_seq OWNED BY alpinehut_db.object_3d_references.id;


--
-- Name: peripheral_group_peripherals; Type: TABLE; Schema: alpinehut_db; Owner: postgres
--

CREATE TABLE alpinehut_db.peripheral_group_peripherals (
    peripheralid bigint,
    peripheralgroupid bigint
);


ALTER TABLE alpinehut_db.peripheral_group_peripherals OWNER TO postgres;

--
-- Name: peripheral_groups; Type: TABLE; Schema: alpinehut_db; Owner: postgres
--

CREATE TABLE alpinehut_db.peripheral_groups (
    id bigint NOT NULL,
    name character varying(128),
    data text,
    description text,
    type alpinehut_db.peripheral_groups_type,
    object3dreferenceid bigint
);


ALTER TABLE alpinehut_db.peripheral_groups OWNER TO postgres;

--
-- Name: peripheral_groups_id_seq; Type: SEQUENCE; Schema: alpinehut_db; Owner: postgres
--

CREATE SEQUENCE alpinehut_db.peripheral_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE alpinehut_db.peripheral_groups_id_seq OWNER TO postgres;

--
-- Name: peripheral_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: alpinehut_db; Owner: postgres
--

ALTER SEQUENCE alpinehut_db.peripheral_groups_id_seq OWNED BY alpinehut_db.peripheral_groups.id;


--
-- Name: peripherals; Type: TABLE; Schema: alpinehut_db; Owner: postgres
--

CREATE TABLE alpinehut_db.peripherals (
    id bigint NOT NULL,
    name character varying(128),
    data text,
    isactive boolean DEFAULT false,
    type alpinehut_db.peripherals_type,
    interface alpinehut_db.peripherals_interface,
    description text,
    lastupdate timestamp with time zone,
    "position" json,
    object3dreferenceid bigint
);


ALTER TABLE alpinehut_db.peripherals OWNER TO postgres;

--
-- Name: peripherals_id_seq; Type: SEQUENCE; Schema: alpinehut_db; Owner: postgres
--

CREATE SEQUENCE alpinehut_db.peripherals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE alpinehut_db.peripherals_id_seq OWNER TO postgres;

--
-- Name: peripherals_id_seq; Type: SEQUENCE OWNED BY; Schema: alpinehut_db; Owner: postgres
--

ALTER SEQUENCE alpinehut_db.peripherals_id_seq OWNED BY alpinehut_db.peripherals.id;


--
-- Name: peripherals_log; Type: TABLE; Schema: alpinehut_db; Owner: postgres
--

CREATE TABLE alpinehut_db.peripherals_log (
    peripheralid bigint NOT NULL,
    created timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    data text
);


ALTER TABLE alpinehut_db.peripherals_log OWNER TO postgres;

--
-- Name: profile_authorizations; Type: TABLE; Schema: alpinehut_db; Owner: postgres
--

CREATE TABLE alpinehut_db.profile_authorizations (
    profileid bigint NOT NULL,
    peripheralgroupid bigint NOT NULL,
    access alpinehut_db.profile_authorizations_access DEFAULT 'Read'::alpinehut_db.profile_authorizations_access NOT NULL,
    id bigint NOT NULL
);


ALTER TABLE alpinehut_db.profile_authorizations OWNER TO postgres;

--
-- Name: profile_authorizations_id_seq; Type: SEQUENCE; Schema: alpinehut_db; Owner: postgres
--

CREATE SEQUENCE alpinehut_db.profile_authorizations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE alpinehut_db.profile_authorizations_id_seq OWNER TO postgres;

--
-- Name: profile_authorizations_id_seq; Type: SEQUENCE OWNED BY; Schema: alpinehut_db; Owner: postgres
--

ALTER SEQUENCE alpinehut_db.profile_authorizations_id_seq OWNED BY alpinehut_db.profile_authorizations.id;


--
-- Name: profiles; Type: TABLE; Schema: alpinehut_db; Owner: postgres
--

CREATE TABLE alpinehut_db.profiles (
    id bigint NOT NULL,
    name character varying(255),
    description text,
    isadmin boolean DEFAULT false
);


ALTER TABLE alpinehut_db.profiles OWNER TO postgres;

--
-- Name: profiles_id_seq; Type: SEQUENCE; Schema: alpinehut_db; Owner: postgres
--

CREATE SEQUENCE alpinehut_db.profiles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE alpinehut_db.profiles_id_seq OWNER TO postgres;

--
-- Name: profiles_id_seq; Type: SEQUENCE OWNED BY; Schema: alpinehut_db; Owner: postgres
--

ALTER SEQUENCE alpinehut_db.profiles_id_seq OWNED BY alpinehut_db.profiles.id;


--
-- Name: auth id; Type: DEFAULT; Schema: alpinehut_db; Owner: postgres
--

ALTER TABLE ONLY alpinehut_db.auth ALTER COLUMN id SET DEFAULT nextval('alpinehut_db.auth_id_seq'::regclass);


--
-- Name: history id; Type: DEFAULT; Schema: alpinehut_db; Owner: postgres
--

ALTER TABLE ONLY alpinehut_db.history ALTER COLUMN id SET DEFAULT nextval('alpinehut_db.history_id_seq'::regclass);


--
-- Name: object_3d_references id; Type: DEFAULT; Schema: alpinehut_db; Owner: postgres
--

ALTER TABLE ONLY alpinehut_db.object_3d_references ALTER COLUMN id SET DEFAULT nextval('alpinehut_db.object_3d_references_id_seq'::regclass);


--
-- Name: peripheral_groups id; Type: DEFAULT; Schema: alpinehut_db; Owner: postgres
--

ALTER TABLE ONLY alpinehut_db.peripheral_groups ALTER COLUMN id SET DEFAULT nextval('alpinehut_db.peripheral_groups_id_seq'::regclass);


--
-- Name: peripherals id; Type: DEFAULT; Schema: alpinehut_db; Owner: postgres
--

ALTER TABLE ONLY alpinehut_db.peripherals ALTER COLUMN id SET DEFAULT nextval('alpinehut_db.peripherals_id_seq'::regclass);


--
-- Name: profile_authorizations id; Type: DEFAULT; Schema: alpinehut_db; Owner: postgres
--

ALTER TABLE ONLY alpinehut_db.profile_authorizations ALTER COLUMN id SET DEFAULT nextval('alpinehut_db.profile_authorizations_id_seq'::regclass);


--
-- Name: profiles id; Type: DEFAULT; Schema: alpinehut_db; Owner: postgres
--

ALTER TABLE ONLY alpinehut_db.profiles ALTER COLUMN id SET DEFAULT nextval('alpinehut_db.profiles_id_seq'::regclass);


--
-- Data for Name: auth; Type: TABLE DATA; Schema: alpinehut_db; Owner: postgres
--

COPY alpinehut_db.auth (id, login, password, profileid, email, salt, role, status, sessionid) FROM stdin;
1	test	$2a$10$G5fsf4iJOZV/Gux8da2Bce0T1IIt8ocxWJhAtLnLi07lMDbvIzD.i	1		$2a$10$G5fsf4iJOZV/Gux8da2Bce	regular	0	f0b1dccb11b44510e11eda572ce13b2bc6be87ef
\.


--
-- Data for Name: history; Type: TABLE DATA; Schema: alpinehut_db; Owner: postgres
--

COPY alpinehut_db.history (id, entitytype, entityid, data, created) FROM stdin;
\.


--
-- Data for Name: object_3d_references; Type: TABLE DATA; Schema: alpinehut_db; Owner: postgres
--

COPY alpinehut_db.object_3d_references (id, type, config, activein) FROM stdin;
1	point	{"Radius": 0.5, "ActiveIn": "floor2Part", "Position": {"x": 1, "y": 1, "z": 1}}	floor2Part
2	box	{"ActiveIn": "floor2Part", "Position": {"x": 4.1, "y": 3.2, "z": 1.7}, "Rotation": {"Axis": {"x": 1, "y": 0, "z": 0}, "Angle": 0}, "Dimensions": {"x": 3.8, "y": 0.1, "z": 3}}	floor2Part
3	point	{"Radius": 0.5, "ActiveIn": "floor2Part", "Position": {"x": 4.5, "y": 3, "z": 1.7}}	floor2Part
4	box	{"ActiveIn": "floor2Part", "Position": {"x": 4.45, "y": 3.2, "z": 5.6}, "Rotation": {"Axis": {"x": 1, "y": 0, "z": 0}, "Angle": 0}, "Dimensions": {"x": 2.5, "y": 0.1, "z": 4.2}}	floor2Part
\.


--
-- Data for Name: peripheral_group_peripherals; Type: TABLE DATA; Schema: alpinehut_db; Owner: postgres
--

COPY alpinehut_db.peripheral_group_peripherals (peripheralid, peripheralgroupid) FROM stdin;
1	1
2	1
3	2
4	2
\.


--
-- Data for Name: peripheral_groups; Type: TABLE DATA; Schema: alpinehut_db; Owner: postgres
--

COPY alpinehut_db.peripheral_groups (id, name, data, description, type, object3dreferenceid) FROM stdin;
1	North Bedroom Heating	{"TemperatureLimit":21,"IsActive":false,"TemperatureSensorID":1,"HeaterID":2}	room on the second floor (above the fireplace)	heating_system	2
2	South Bedroom heating	{"TemperatureLimit":35,"IsActive":true,"TemperatureSensorID":3,"HeaterID":4}	heating of the bedrom 2 upd	heating_system	4
\.


--
-- Data for Name: peripherals; Type: TABLE DATA; Schema: alpinehut_db; Owner: postgres
--

COPY alpinehut_db.peripherals (id, name, data, isactive, type, interface, description, lastupdate, "position", object3dreferenceid) FROM stdin;
1	Floor Sensor	{"DeviceID":"00000a478246","Temperature":19.781192641747992}	f	Sensor	1wire	Датчик температуры пола в комнате над камином	2018-08-28 23:54:06+00	\N	1
2	Floor Heater	{"Pin":11,"Active":"HIGH"}	f	Heater	direct	Пленочный нагреватель теплого пола в комнате над камином	2018-08-28 21:11:43+00	\N	2
3	Floor Sensor	{"DeviceID":"00000a478247","Temperature":14.273921244398302}	f	Sensor	1wire	Temperature sensor in the bedroom 2	2022-05-18 11:18:09+00	\N	3
4	Floor Heater	{"Pin":12,"Active":"HIGH"}	t	Heater	direct	Floor heater in the bedroom 2	2022-05-18 11:19:25+00	\N	4
\.


--
-- Data for Name: peripherals_log; Type: TABLE DATA; Schema: alpinehut_db; Owner: postgres
--

COPY alpinehut_db.peripherals_log (peripheralid, created, data) FROM stdin;
\.


--
-- Data for Name: profile_authorizations; Type: TABLE DATA; Schema: alpinehut_db; Owner: postgres
--

COPY alpinehut_db.profile_authorizations (profileid, peripheralgroupid, access, id) FROM stdin;
1	1	Read	1
1	1	Setup	2
1	1	Activate	3
2	1	Read	4
2	1	Activate	5
3	1	Read	6
\.


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: alpinehut_db; Owner: postgres
--

COPY alpinehut_db.profiles (id, name, description, isadmin) FROM stdin;
1	Администратор	Пользователь имеет доступ ко всем возможностям управления	t
2	Активатор	Доступ к включению/выключению	f
3	Наблюдатель	Просмотр данных	f
\.


--
-- Name: auth_id_seq; Type: SEQUENCE SET; Schema: alpinehut_db; Owner: postgres
--

SELECT pg_catalog.setval('alpinehut_db.auth_id_seq', 1, true);


--
-- Name: history_id_seq; Type: SEQUENCE SET; Schema: alpinehut_db; Owner: postgres
--

SELECT pg_catalog.setval('alpinehut_db.history_id_seq', 1, true);


--
-- Name: object_3d_references_id_seq; Type: SEQUENCE SET; Schema: alpinehut_db; Owner: postgres
--

SELECT pg_catalog.setval('alpinehut_db.object_3d_references_id_seq', 4, true);


--
-- Name: peripheral_groups_id_seq; Type: SEQUENCE SET; Schema: alpinehut_db; Owner: postgres
--

SELECT pg_catalog.setval('alpinehut_db.peripheral_groups_id_seq', 2, true);


--
-- Name: peripherals_id_seq; Type: SEQUENCE SET; Schema: alpinehut_db; Owner: postgres
--

SELECT pg_catalog.setval('alpinehut_db.peripherals_id_seq', 4, true);


--
-- Name: profile_authorizations_id_seq; Type: SEQUENCE SET; Schema: alpinehut_db; Owner: postgres
--

SELECT pg_catalog.setval('alpinehut_db.profile_authorizations_id_seq', 6, true);


--
-- Name: profiles_id_seq; Type: SEQUENCE SET; Schema: alpinehut_db; Owner: postgres
--

SELECT pg_catalog.setval('alpinehut_db.profiles_id_seq', 3, true);


--
-- Name: auth idx_16440_primary; Type: CONSTRAINT; Schema: alpinehut_db; Owner: postgres
--

ALTER TABLE ONLY alpinehut_db.auth
    ADD CONSTRAINT idx_16440_primary PRIMARY KEY (id);


--
-- Name: history idx_16449_primary; Type: CONSTRAINT; Schema: alpinehut_db; Owner: postgres
--

ALTER TABLE ONLY alpinehut_db.history
    ADD CONSTRAINT idx_16449_primary PRIMARY KEY (id);


--
-- Name: object_3d_references idx_16457_primary; Type: CONSTRAINT; Schema: alpinehut_db; Owner: postgres
--

ALTER TABLE ONLY alpinehut_db.object_3d_references
    ADD CONSTRAINT idx_16457_primary PRIMARY KEY (id);


--
-- Name: peripherals idx_16466_primary; Type: CONSTRAINT; Schema: alpinehut_db; Owner: postgres
--

ALTER TABLE ONLY alpinehut_db.peripherals
    ADD CONSTRAINT idx_16466_primary PRIMARY KEY (id);


--
-- Name: peripherals_log idx_16473_primary; Type: CONSTRAINT; Schema: alpinehut_db; Owner: postgres
--

ALTER TABLE ONLY alpinehut_db.peripherals_log
    ADD CONSTRAINT idx_16473_primary PRIMARY KEY (peripheralid, created);


--
-- Name: peripheral_groups idx_16480_primary; Type: CONSTRAINT; Schema: alpinehut_db; Owner: postgres
--

ALTER TABLE ONLY alpinehut_db.peripheral_groups
    ADD CONSTRAINT idx_16480_primary PRIMARY KEY (id);


--
-- Name: profiles idx_16490_primary; Type: CONSTRAINT; Schema: alpinehut_db; Owner: postgres
--

ALTER TABLE ONLY alpinehut_db.profiles
    ADD CONSTRAINT idx_16490_primary PRIMARY KEY (id);


--
-- Name: profile_authorizations idx_16498_primary; Type: CONSTRAINT; Schema: alpinehut_db; Owner: postgres
--

ALTER TABLE ONLY alpinehut_db.profile_authorizations
    ADD CONSTRAINT idx_16498_primary PRIMARY KEY (id);


--
-- Name: idx_16440_auth_profiles_id_fk; Type: INDEX; Schema: alpinehut_db; Owner: postgres
--

CREATE INDEX idx_16440_auth_profiles_id_fk ON alpinehut_db.auth USING btree (profileid);


--
-- Name: idx_16440_id; Type: INDEX; Schema: alpinehut_db; Owner: postgres
--

CREATE UNIQUE INDEX idx_16440_id ON alpinehut_db.auth USING btree (id);


--
-- Name: idx_16440_login; Type: INDEX; Schema: alpinehut_db; Owner: postgres
--

CREATE UNIQUE INDEX idx_16440_login ON alpinehut_db.auth USING btree (login);


--
-- Name: idx_16449_history_entitytype_entityid_created_index; Type: INDEX; Schema: alpinehut_db; Owner: postgres
--

CREATE INDEX idx_16449_history_entitytype_entityid_created_index ON alpinehut_db.history USING btree (entitytype, entityid, created);


--
-- Name: idx_16457_object_3d_reference_id_uindex; Type: INDEX; Schema: alpinehut_db; Owner: postgres
--

CREATE UNIQUE INDEX idx_16457_object_3d_reference_id_uindex ON alpinehut_db.object_3d_references USING btree (id);


--
-- Name: idx_16466_peripherals_id_uindex; Type: INDEX; Schema: alpinehut_db; Owner: postgres
--

CREATE UNIQUE INDEX idx_16466_peripherals_id_uindex ON alpinehut_db.peripherals USING btree (id);


--
-- Name: idx_16466_peripherals_object_3d_reference_id_fk; Type: INDEX; Schema: alpinehut_db; Owner: postgres
--

CREATE INDEX idx_16466_peripherals_object_3d_reference_id_fk ON alpinehut_db.peripherals USING btree (object3dreferenceid);


--
-- Name: idx_16480_peripheral_groups_id_uindex; Type: INDEX; Schema: alpinehut_db; Owner: postgres
--

CREATE UNIQUE INDEX idx_16480_peripheral_groups_id_uindex ON alpinehut_db.peripheral_groups USING btree (id);


--
-- Name: idx_16480_peripheral_groups_object_3d_reference_id_fk; Type: INDEX; Schema: alpinehut_db; Owner: postgres
--

CREATE INDEX idx_16480_peripheral_groups_object_3d_reference_id_fk ON alpinehut_db.peripheral_groups USING btree (object3dreferenceid);


--
-- Name: idx_16486_peripheral_group_peripherals_peripheralgroupid_periph; Type: INDEX; Schema: alpinehut_db; Owner: postgres
--

CREATE UNIQUE INDEX idx_16486_peripheral_group_peripherals_peripheralgroupid_periph ON alpinehut_db.peripheral_group_peripherals USING btree (peripheralgroupid, peripheralid);


--
-- Name: idx_16486_peripheral_group_peripherals_peripherals_id_fk; Type: INDEX; Schema: alpinehut_db; Owner: postgres
--

CREATE INDEX idx_16486_peripheral_group_peripherals_peripherals_id_fk ON alpinehut_db.peripheral_group_peripherals USING btree (peripheralid);


--
-- Name: idx_16490_profiles_id_uindex; Type: INDEX; Schema: alpinehut_db; Owner: postgres
--

CREATE UNIQUE INDEX idx_16490_profiles_id_uindex ON alpinehut_db.profiles USING btree (id);


--
-- Name: idx_16498_ppa_secondary; Type: INDEX; Schema: alpinehut_db; Owner: postgres
--

CREATE UNIQUE INDEX idx_16498_ppa_secondary ON alpinehut_db.profile_authorizations USING btree (profileid, peripheralgroupid, access);


--
-- Name: idx_16498_profile_authorizations_id_uindex; Type: INDEX; Schema: alpinehut_db; Owner: postgres
--

CREATE UNIQUE INDEX idx_16498_profile_authorizations_id_uindex ON alpinehut_db.profile_authorizations USING btree (id);


--
-- Name: idx_16498_profile_authorizations_peripheral_groups_id_fk; Type: INDEX; Schema: alpinehut_db; Owner: postgres
--

CREATE INDEX idx_16498_profile_authorizations_peripheral_groups_id_fk ON alpinehut_db.profile_authorizations USING btree (peripheralgroupid);


--
-- Name: idx_16498_profile_authorizations_profileid_peripheralgroupid_in; Type: INDEX; Schema: alpinehut_db; Owner: postgres
--

CREATE INDEX idx_16498_profile_authorizations_profileid_peripheralgroupid_in ON alpinehut_db.profile_authorizations USING btree (profileid, peripheralgroupid);


--
-- Name: auth auth_profiles_id_fk; Type: FK CONSTRAINT; Schema: alpinehut_db; Owner: postgres
--

ALTER TABLE ONLY alpinehut_db.auth
    ADD CONSTRAINT auth_profiles_id_fk FOREIGN KEY (profileid) REFERENCES alpinehut_db.profiles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: peripheral_group_peripherals peripheral_group_peripherals_peripheral_groups_id_fk; Type: FK CONSTRAINT; Schema: alpinehut_db; Owner: postgres
--

ALTER TABLE ONLY alpinehut_db.peripheral_group_peripherals
    ADD CONSTRAINT peripheral_group_peripherals_peripheral_groups_id_fk FOREIGN KEY (peripheralgroupid) REFERENCES alpinehut_db.peripheral_groups(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: peripheral_group_peripherals peripheral_group_peripherals_peripherals_id_fk; Type: FK CONSTRAINT; Schema: alpinehut_db; Owner: postgres
--

ALTER TABLE ONLY alpinehut_db.peripheral_group_peripherals
    ADD CONSTRAINT peripheral_group_peripherals_peripherals_id_fk FOREIGN KEY (peripheralid) REFERENCES alpinehut_db.peripherals(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: peripheral_groups peripheral_groups_object_3d_reference_id_fk; Type: FK CONSTRAINT; Schema: alpinehut_db; Owner: postgres
--

ALTER TABLE ONLY alpinehut_db.peripheral_groups
    ADD CONSTRAINT peripheral_groups_object_3d_reference_id_fk FOREIGN KEY (object3dreferenceid) REFERENCES alpinehut_db.object_3d_references(id) ON UPDATE SET NULL ON DELETE SET NULL;


--
-- Name: peripherals peripherals_object_3d_reference_id_fk; Type: FK CONSTRAINT; Schema: alpinehut_db; Owner: postgres
--

ALTER TABLE ONLY alpinehut_db.peripherals
    ADD CONSTRAINT peripherals_object_3d_reference_id_fk FOREIGN KEY (object3dreferenceid) REFERENCES alpinehut_db.object_3d_references(id) ON UPDATE SET NULL ON DELETE SET NULL;


--
-- Name: profile_authorizations profile_authorizations_peripheral_groups_id_fk; Type: FK CONSTRAINT; Schema: alpinehut_db; Owner: postgres
--

ALTER TABLE ONLY alpinehut_db.profile_authorizations
    ADD CONSTRAINT profile_authorizations_peripheral_groups_id_fk FOREIGN KEY (peripheralgroupid) REFERENCES alpinehut_db.peripheral_groups(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: profile_authorizations profile_authorizations_profiles_id_fk; Type: FK CONSTRAINT; Schema: alpinehut_db; Owner: postgres
--

ALTER TABLE ONLY alpinehut_db.profile_authorizations
    ADD CONSTRAINT profile_authorizations_profiles_id_fk FOREIGN KEY (profileid) REFERENCES alpinehut_db.profiles(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

