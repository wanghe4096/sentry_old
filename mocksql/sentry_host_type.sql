--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: sentry_host_type; Type: TABLE; Schema: public; Owner: wanghe; Tablespace: 
--

CREATE TABLE sentry_host_type (
    id integer NOT NULL,
    host_type character varying(128),
    user_id integer NOT NULL
);


ALTER TABLE sentry_host_type OWNER TO wanghe;

--
-- Name: sentry_host_type_id_seq; Type: SEQUENCE; Schema: public; Owner: wanghe
--

CREATE SEQUENCE sentry_host_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sentry_host_type_id_seq OWNER TO wanghe;

--
-- Name: sentry_host_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wanghe
--

ALTER SEQUENCE sentry_host_type_id_seq OWNED BY sentry_host_type.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: wanghe
--

ALTER TABLE ONLY sentry_host_type ALTER COLUMN id SET DEFAULT nextval('sentry_host_type_id_seq'::regclass);


--
-- Data for Name: sentry_host_type; Type: TABLE DATA; Schema: public; Owner: wanghe
--

INSERT INTO sentry_host_type (id, host_type, user_id) VALUES (4, '代理服务器', 1);
INSERT INTO sentry_host_type (id, host_type, user_id) VALUES (5, 'VPN', 1);
INSERT INTO sentry_host_type (id, host_type, user_id) VALUES (6, 'MYSQL服务器', 1);
INSERT INTO sentry_host_type (id, host_type, user_id) VALUES (1, '数据库服务器', 1);
INSERT INTO sentry_host_type (id, host_type, user_id) VALUES (2, 'Web服务器', 1);
INSERT INTO sentry_host_type (id, host_type, user_id) VALUES (3, '认证服务器', 1);


--
-- Name: sentry_host_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wanghe
--

SELECT pg_catalog.setval('sentry_host_type_id_seq', 6, true);


--
-- Name: sentry_host_type_pkey; Type: CONSTRAINT; Schema: public; Owner: wanghe; Tablespace: 
--

ALTER TABLE ONLY sentry_host_type
    ADD CONSTRAINT sentry_host_type_pkey PRIMARY KEY (id);


--
-- Name: sentry_host_type_user_id; Type: INDEX; Schema: public; Owner: wanghe; Tablespace: 
--

CREATE INDEX sentry_host_type_user_id ON sentry_host_type USING btree (user_id);


--
-- Name: user_id_refs_id_0c590f5a; Type: FK CONSTRAINT; Schema: public; Owner: wanghe
--

ALTER TABLE ONLY sentry_host_type
    ADD CONSTRAINT user_id_refs_id_0c590f5a FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

