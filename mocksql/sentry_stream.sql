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
-- Name: sentry_stream; Type: TABLE; Schema: public; Owner: wanghe; Tablespace: 
--

CREATE TABLE sentry_stream (
    id integer NOT NULL,
    stream_name character varying(128) NOT NULL,
    stream_type_id integer,
    size integer,
    modify_timestamp timestamp with time zone,
    create_timestamp timestamp with time zone,
    tag_id integer,
    host_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE sentry_stream OWNER TO wanghe;

--
-- Name: sentry_stream_id_seq; Type: SEQUENCE; Schema: public; Owner: wanghe
--

CREATE SEQUENCE sentry_stream_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sentry_stream_id_seq OWNER TO wanghe;

--
-- Name: sentry_stream_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wanghe
--

ALTER SEQUENCE sentry_stream_id_seq OWNED BY sentry_stream.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: wanghe
--

ALTER TABLE ONLY sentry_stream ALTER COLUMN id SET DEFAULT nextval('sentry_stream_id_seq'::regclass);


--
-- Data for Name: sentry_stream; Type: TABLE DATA; Schema: public; Owner: wanghe
--

INSERT INTO sentry_stream (id, stream_name, stream_type_id, size, modify_timestamp, create_timestamp, tag_id, host_id, user_id) VALUES (1, 'nginx.access.log', 1, 23452434, '2015-01-13 15:22:44+08', '2015-01-13 15:22:44+08', NULL, 1, 1);
INSERT INTO sentry_stream (id, stream_name, stream_type_id, size, modify_timestamp, create_timestamp, tag_id, host_id, user_id) VALUES (2, 'nginx.error.log', 2, 234452232, '2015-01-13 15:22:44+08', '2015-01-13 15:21:32+08', NULL, 1, 1);
INSERT INTO sentry_stream (id, stream_name, stream_type_id, size, modify_timestamp, create_timestamp, tag_id, host_id, user_id) VALUES (3, 'apache.access.log', 1, 43123123, '2015-01-13 16:32:00+08', '2015-01-13 16:32:00+08', NULL, 1, 1);
INSERT INTO sentry_stream (id, stream_name, stream_type_id, size, modify_timestamp, create_timestamp, tag_id, host_id, user_id) VALUES (4, 'apache.error.log', 1, 5432321, '2015-01-13 16:32:00+08', '2015-01-13 16:32:00+08', NULL, 1, 1);


--
-- Name: sentry_stream_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wanghe
--

SELECT pg_catalog.setval('sentry_stream_id_seq', 4, true);


--
-- Name: sentry_stream_pkey; Type: CONSTRAINT; Schema: public; Owner: wanghe; Tablespace: 
--

ALTER TABLE ONLY sentry_stream
    ADD CONSTRAINT sentry_stream_pkey PRIMARY KEY (id);


--
-- Name: sentry_stream_host_id; Type: INDEX; Schema: public; Owner: wanghe; Tablespace: 
--

CREATE INDEX sentry_stream_host_id ON sentry_stream USING btree (host_id);


--
-- Name: sentry_stream_stream_type_id; Type: INDEX; Schema: public; Owner: wanghe; Tablespace: 
--

CREATE INDEX sentry_stream_stream_type_id ON sentry_stream USING btree (stream_type_id);


--
-- Name: sentry_stream_tag_id; Type: INDEX; Schema: public; Owner: wanghe; Tablespace: 
--

CREATE INDEX sentry_stream_tag_id ON sentry_stream USING btree (tag_id);


--
-- Name: sentry_stream_user_id; Type: INDEX; Schema: public; Owner: wanghe; Tablespace: 
--

CREATE INDEX sentry_stream_user_id ON sentry_stream USING btree (user_id);


--
-- Name: host_id_refs_id_5ca9dd22; Type: FK CONSTRAINT; Schema: public; Owner: wanghe
--

ALTER TABLE ONLY sentry_stream
    ADD CONSTRAINT host_id_refs_id_5ca9dd22 FOREIGN KEY (host_id) REFERENCES sentry_host(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: stream_type_id_refs_id_42468a3a; Type: FK CONSTRAINT; Schema: public; Owner: wanghe
--

ALTER TABLE ONLY sentry_stream
    ADD CONSTRAINT stream_type_id_refs_id_42468a3a FOREIGN KEY (stream_type_id) REFERENCES sentry_stream_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: tag_id_refs_id_7c811ae1; Type: FK CONSTRAINT; Schema: public; Owner: wanghe
--

ALTER TABLE ONLY sentry_stream
    ADD CONSTRAINT tag_id_refs_id_7c811ae1 FOREIGN KEY (tag_id) REFERENCES sentry_tag(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: user_id_refs_id_1ff19169; Type: FK CONSTRAINT; Schema: public; Owner: wanghe
--

ALTER TABLE ONLY sentry_stream
    ADD CONSTRAINT user_id_refs_id_1ff19169 FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

