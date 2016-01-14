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
-- Name: sentry_log_file; Type: TABLE; Schema: public; Owner: wanghe; Tablespace: 
--

CREATE TABLE sentry_log_file (
    id integer NOT NULL,
    file_name character varying(128) NOT NULL,
    file_path character varying(256),
    stream_type character varying(128),
    host_id integer,
    tag_id integer,
    create_timestamp timestamp with time zone,
    modify_timestamp timestamp with time zone,
    owner integer,
    "group" integer,
    mod integer,
    size integer,
    crc32_value integer,
    stream_id integer
);


ALTER TABLE sentry_log_file OWNER TO wanghe;

--
-- Name: sentry_log_file_id_seq; Type: SEQUENCE; Schema: public; Owner: wanghe
--

CREATE SEQUENCE sentry_log_file_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sentry_log_file_id_seq OWNER TO wanghe;

--
-- Name: sentry_log_file_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wanghe
--

ALTER SEQUENCE sentry_log_file_id_seq OWNED BY sentry_log_file.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: wanghe
--

ALTER TABLE ONLY sentry_log_file ALTER COLUMN id SET DEFAULT nextval('sentry_log_file_id_seq'::regclass);


--
-- Data for Name: sentry_log_file; Type: TABLE DATA; Schema: public; Owner: wanghe
--

INSERT INTO sentry_log_file (id, file_name, file_path, stream_type, host_id, tag_id, create_timestamp, modify_timestamp, owner, "group", mod, size, crc32_value, stream_id) VALUES (11, 'error.log', '/var/log/mysql', '数据库服务器', 1, NULL, '2016-01-15 00:00:00+08', '2016-01-15 00:00:00+08', NULL, NULL, NULL, 6423452, 123542422, 1);
INSERT INTO sentry_log_file (id, file_name, file_path, stream_type, host_id, tag_id, create_timestamp, modify_timestamp, owner, "group", mod, size, crc32_value, stream_id) VALUES (12, 'error.log', 'var/log/nginx', 'web服务器', 2, NULL, '2016-01-15 12:34:22+08', '2016-01-15 12:34:22+08', NULL, NULL, NULL, 234342, 734624532, 1);
INSERT INTO sentry_log_file (id, file_name, file_path, stream_type, host_id, tag_id, create_timestamp, modify_timestamp, owner, "group", mod, size, crc32_value, stream_id) VALUES (13, 'access.log', '/var/log/apache', 'web服务器', 2, NULL, '2016-01-15 12:34:12+08', '2016-01-15 12:34:22+08', NULL, NULL, NULL, 100111334, 645345234, 1);
INSERT INTO sentry_log_file (id, file_name, file_path, stream_type, host_id, tag_id, create_timestamp, modify_timestamp, owner, "group", mod, size, crc32_value, stream_id) VALUES (14, 'error.log', '/var/log/apache', 'web服务器', 2, NULL, '2016-01-15 12:34:22+08', '2016-01-15 12:34:22+08', NULL, NULL, NULL, 23452342, 543222341, 1);
INSERT INTO sentry_log_file (id, file_name, file_path, stream_type, host_id, tag_id, create_timestamp, modify_timestamp, owner, "group", mod, size, crc32_value, stream_id) VALUES (15, 'oracle.log', '/var/log/oracle', '数据库服务器', 1, NULL, '2016-01-15 12:14:22+08', '2016-01-15 12:34:22+08', NULL, NULL, NULL, 12345123, 534234451, 1);
INSERT INTO sentry_log_file (id, file_name, file_path, stream_type, host_id, tag_id, create_timestamp, modify_timestamp, owner, "group", mod, size, crc32_value, stream_id) VALUES (16, 'access.log', '/var/log/mysql', '数据库服务器', 3, NULL, '2016-01-15 13:34:22+08', '2016-01-15 12:34:22+08', NULL, NULL, NULL, 34234245, 684749827, 1);
INSERT INTO sentry_log_file (id, file_name, file_path, stream_type, host_id, tag_id, create_timestamp, modify_timestamp, owner, "group", mod, size, crc32_value, stream_id) VALUES (17, 'access.log', '/var/log/nginx', '代理服务器', 3, NULL, '2016-01-15 13:34:22+08', '2016-01-15 13:34:22+08', NULL, NULL, NULL, 134451, 983213521, 1);


--
-- Name: sentry_log_file_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wanghe
--

SELECT pg_catalog.setval('sentry_log_file_id_seq', 17, true);


--
-- Name: sentry_log_file_pkey; Type: CONSTRAINT; Schema: public; Owner: wanghe; Tablespace: 
--

ALTER TABLE ONLY sentry_log_file
    ADD CONSTRAINT sentry_log_file_pkey PRIMARY KEY (id);


--
-- Name: sentry_log_file_host_id; Type: INDEX; Schema: public; Owner: wanghe; Tablespace: 
--

CREATE INDEX sentry_log_file_host_id ON sentry_log_file USING btree (host_id);


--
-- Name: sentry_log_file_stream_id; Type: INDEX; Schema: public; Owner: wanghe; Tablespace: 
--

CREATE INDEX sentry_log_file_stream_id ON sentry_log_file USING btree (stream_id);


--
-- Name: sentry_log_file_tag_id; Type: INDEX; Schema: public; Owner: wanghe; Tablespace: 
--

CREATE INDEX sentry_log_file_tag_id ON sentry_log_file USING btree (tag_id);


--
-- Name: host_id_refs_id_e4012b47; Type: FK CONSTRAINT; Schema: public; Owner: wanghe
--

ALTER TABLE ONLY sentry_log_file
    ADD CONSTRAINT host_id_refs_id_e4012b47 FOREIGN KEY (host_id) REFERENCES sentry_host(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: stream_id_refs_id_a96a81ce; Type: FK CONSTRAINT; Schema: public; Owner: wanghe
--

ALTER TABLE ONLY sentry_log_file
    ADD CONSTRAINT stream_id_refs_id_a96a81ce FOREIGN KEY (stream_id) REFERENCES sentry_stream(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: tag_id_refs_id_df78ff62; Type: FK CONSTRAINT; Schema: public; Owner: wanghe
--

ALTER TABLE ONLY sentry_log_file
    ADD CONSTRAINT tag_id_refs_id_df78ff62 FOREIGN KEY (tag_id) REFERENCES sentry_tag(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

