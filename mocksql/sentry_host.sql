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
-- Name: sentry_host; Type: TABLE; Schema: public; Owner: wanghe; Tablespace: 
--

CREATE TABLE sentry_host (
    id integer NOT NULL,
    host_name character varying(128) NOT NULL,
    host_key character varying(128),
    system character varying(128),
    distver character varying(128),
    host_type_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE sentry_host OWNER TO wanghe;

--
-- Name: sentry_host_id_seq; Type: SEQUENCE; Schema: public; Owner: wanghe
--

CREATE SEQUENCE sentry_host_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sentry_host_id_seq OWNER TO wanghe;

--
-- Name: sentry_host_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wanghe
--

ALTER SEQUENCE sentry_host_id_seq OWNED BY sentry_host.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: wanghe
--

ALTER TABLE ONLY sentry_host ALTER COLUMN id SET DEFAULT nextval('sentry_host_id_seq'::regclass);


--
-- Data for Name: sentry_host; Type: TABLE DATA; Schema: public; Owner: wanghe
--

INSERT INTO sentry_host (id, host_name, host_key, system, distver, host_type_id, user_id) VALUES (3, 'a23d650bee@centos', '2e092f112aa23d650bee15aa6d2582ce', 'centos', '3.2.1', 1, 1);
INSERT INTO sentry_host (id, host_name, host_key, system, distver, host_type_id, user_id) VALUES (4, 'a2adf65asdf0bee@centos', '7104fc4c8c34e40e555bf9b75f591aea', 'centos', '3.1.0', 1, 1);
INSERT INTO sentry_host (id, host_name, host_key, system, distver, host_type_id, user_id) VALUES (2, '92eecbab@opensuse', 'b34f9859db111b092eecbab0da47d958', 'opensuse', '3.1.0', 2, 1);
INSERT INTO sentry_host (id, host_name, host_key, system, distver, host_type_id, user_id) VALUES (1, 'b34f9859db@linux', 'd35fa7d6fa222e27f5ca562514c67745', 'linux', '3.1.0', 3, 1);


--
-- Name: sentry_host_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wanghe
--

SELECT pg_catalog.setval('sentry_host_id_seq', 5, true);


--
-- Name: sentry_host_pkey; Type: CONSTRAINT; Schema: public; Owner: wanghe; Tablespace: 
--

ALTER TABLE ONLY sentry_host
    ADD CONSTRAINT sentry_host_pkey PRIMARY KEY (id);


--
-- Name: sentry_host_host_type_id; Type: INDEX; Schema: public; Owner: wanghe; Tablespace: 
--

CREATE INDEX sentry_host_host_type_id ON sentry_host USING btree (host_type_id);


--
-- Name: sentry_host_user_id; Type: INDEX; Schema: public; Owner: wanghe; Tablespace: 
--

CREATE INDEX sentry_host_user_id ON sentry_host USING btree (user_id);


--
-- Name: host_type_id_refs_id_119eb513; Type: FK CONSTRAINT; Schema: public; Owner: wanghe
--

ALTER TABLE ONLY sentry_host
    ADD CONSTRAINT host_type_id_refs_id_119eb513 FOREIGN KEY (host_type_id) REFERENCES sentry_host_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: user_id_refs_id_8ff099ee; Type: FK CONSTRAINT; Schema: public; Owner: wanghe
--

ALTER TABLE ONLY sentry_host
    ADD CONSTRAINT user_id_refs_id_8ff099ee FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

