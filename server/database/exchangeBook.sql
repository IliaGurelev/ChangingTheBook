PGDMP     8                	    |            ExchangeBook    14.11    14.11 &               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    24591    ExchangeBook    DATABASE     k   CREATE DATABASE "ExchangeBook" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Russia.1251';
    DROP DATABASE "ExchangeBook";
                postgres    false            �            1259    24600    books    TABLE     �   CREATE TABLE public.books (
    id integer NOT NULL,
    name character varying,
    preview_image character varying,
    description character varying,
    id_owner integer
);
    DROP TABLE public.books;
       public         heap    postgres    false            �            1259    24599    Books_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Books_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Books_id_seq";
       public          postgres    false    210                       0    0    Books_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Books_id_seq" OWNED BY public.books.id;
          public          postgres    false    209            �            1259    24625    message    TABLE     �   CREATE TABLE public.message (
    id integer NOT NULL,
    id_messager integer,
    id_sender integer,
    text character varying
);
    DROP TABLE public.message;
       public         heap    postgres    false            �            1259    24624    message_id_seq    SEQUENCE     �   CREATE SEQUENCE public.message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.message_id_seq;
       public          postgres    false    216                       0    0    message_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.message_id_seq OWNED BY public.message.id;
          public          postgres    false    215            �            1259    24618    messager    TABLE     f   CREATE TABLE public.messager (
    id integer NOT NULL,
    id_owner integer,
    id_buyer integer
);
    DROP TABLE public.messager;
       public         heap    postgres    false            �            1259    24617    messager_id_seq    SEQUENCE     �   CREATE SEQUENCE public.messager_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.messager_id_seq;
       public          postgres    false    214                       0    0    messager_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.messager_id_seq OWNED BY public.messager.id;
          public          postgres    false    213            �            1259    24609    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying,
    password character varying,
    name character varying,
    avatar_id integer
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    24608    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public          postgres    false    212                       0    0    user_id_seq    SEQUENCE OWNED BY     <   ALTER SEQUENCE public.user_id_seq OWNED BY public.users.id;
          public          postgres    false    211            k           2604    24603    books id    DEFAULT     f   ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public."Books_id_seq"'::regclass);
 7   ALTER TABLE public.books ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    210    210            n           2604    24628 
   message id    DEFAULT     h   ALTER TABLE ONLY public.message ALTER COLUMN id SET DEFAULT nextval('public.message_id_seq'::regclass);
 9   ALTER TABLE public.message ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            m           2604    24621    messager id    DEFAULT     j   ALTER TABLE ONLY public.messager ALTER COLUMN id SET DEFAULT nextval('public.messager_id_seq'::regclass);
 :   ALTER TABLE public.messager ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213    214            l           2604    24612    users id    DEFAULT     c   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    211    212            
          0    24600    books 
   TABLE DATA           O   COPY public.books (id, name, preview_image, description, id_owner) FROM stdin;
    public          postgres    false    210   )                 0    24625    message 
   TABLE DATA           C   COPY public.message (id, id_messager, id_sender, text) FROM stdin;
    public          postgres    false    216   D*                 0    24618    messager 
   TABLE DATA           :   COPY public.messager (id, id_owner, id_buyer) FROM stdin;
    public          postgres    false    214   �*                 0    24609    users 
   TABLE DATA           E   COPY public.users (id, email, password, name, avatar_id) FROM stdin;
    public          postgres    false    212   �*                  0    0    Books_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Books_id_seq"', 2, true);
          public          postgres    false    209                       0    0    message_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.message_id_seq', 3, true);
          public          postgres    false    215                       0    0    messager_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.messager_id_seq', 2, true);
          public          postgres    false    213                       0    0    user_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.user_id_seq', 2, true);
          public          postgres    false    211            p           2606    24607    books Books_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.books
    ADD CONSTRAINT "Books_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.books DROP CONSTRAINT "Books_pkey";
       public            postgres    false    210            x           2606    24632    message message_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.message DROP CONSTRAINT message_pkey;
       public            postgres    false    216            v           2606    24634    messager messager_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.messager
    ADD CONSTRAINT messager_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.messager DROP CONSTRAINT messager_pkey;
       public            postgres    false    214            r           2606    24616    users user_pkey 
   CONSTRAINT     M   ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 9   ALTER TABLE ONLY public.users DROP CONSTRAINT user_pkey;
       public            postgres    false    212            t           2606    24661    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    212            y           2606    24655    books books_id_owner_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_id_owner_fkey FOREIGN KEY (id_owner) REFERENCES public.users(id) NOT VALID;
 C   ALTER TABLE ONLY public.books DROP CONSTRAINT books_id_owner_fkey;
       public          postgres    false    3186    212    210            |           2606    24645     message message_id_messager_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_id_messager_fkey FOREIGN KEY (id_messager) REFERENCES public.messager(id) NOT VALID;
 J   ALTER TABLE ONLY public.message DROP CONSTRAINT message_id_messager_fkey;
       public          postgres    false    214    3190    216            }           2606    24650    message message_id_sender_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_id_sender_fkey FOREIGN KEY (id_sender) REFERENCES public.users(id) NOT VALID;
 H   ALTER TABLE ONLY public.message DROP CONSTRAINT message_id_sender_fkey;
       public          postgres    false    3186    216    212            {           2606    24640    messager messager_id_buyer_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.messager
    ADD CONSTRAINT messager_id_buyer_fkey FOREIGN KEY (id_buyer) REFERENCES public.users(id) NOT VALID;
 I   ALTER TABLE ONLY public.messager DROP CONSTRAINT messager_id_buyer_fkey;
       public          postgres    false    212    214    3186            z           2606    24635    messager messager_id_tovar_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.messager
    ADD CONSTRAINT messager_id_tovar_fkey FOREIGN KEY (id_owner) REFERENCES public.books(id) NOT VALID;
 I   ALTER TABLE ONLY public.messager DROP CONSTRAINT messager_id_tovar_fkey;
       public          postgres    false    210    3184    214            
   ,  x�e�_N�@Ɵ�S���nK������]@@i���D}�ȋ�Ԫ���fn��&��o&���	�!�	>�QY����!c8�7(q[(`�`�O8�9�1X��w9-}2����JŅu�����85�:�}g8�I7����K:���a�☡�e���`�sX`iI[��r�bFZ�^�F�z8r�mk��������&��T"�O�M�	#Cϓu7r}e�F���(���@yFH��/Dh�(�W�����?O9�nk�䁴6���$��ح5���X�Hn{�|�;�m���g         s   x�E��	1��������`#�+��E/^����o:2�����yu�]�D�9��s#k������߶�Z�~t�yj�=I��I�]��y#זҎ*�S��"��Q���-��}ρE�            x�3�4�4�b ���� 	         T   x�3�,K��ILIի�/uH��+*�44261�0���=�9��8��RS�L�s����sa��\�p���N#�=... ���     