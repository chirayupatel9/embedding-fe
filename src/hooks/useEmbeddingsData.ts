import { useState, useEffect } from 'react';
import { EmbeddingItem, Point } from '../types/embedding';

const MOCK_API_DATA = {
    "items": [
        {
            "embedding": [11.247342109680176, 1.7719507217407227],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_1.jpg"
        }, {
            "embedding": [5.843488693237305, 2.9818501472473145],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_82.jpeg"
        }, {
            "embedding": [1.0165259838104248, 4.972050189971924],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_16.jpg"
        }, {
            "embedding": [2.2613582611083984, 5.550540447235107],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_57.jpg"
        }, {
            "embedding": [1.4057939052581787, 4.408754348754883],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_12.jpg"
        }, {
            "embedding": [2.5955684185028076, 5.26066255569458],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_33.jpg"
        }, {
            "embedding": [9.797688484191895, 2.3447093963623047],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_40.jpg"
        }, {
            "embedding": [5.552468299865723, 3.639700412750244],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_10.jpg"
        }, {
            "embedding": [8.572311401367188, 2.4519052505493164],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_21.jpg"
        }, {
            "embedding": [9.561832427978516, 2.5245444774627686],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_78.jpg"
        }, {
            "embedding": [1.3911590576171875, 4.778775691986084],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_4.jpg"
        }, {
            "embedding": [5.613020420074463, 3.2865729331970215],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_38.jpg"
        }, {
            "embedding": [9.813032150268555, 2.6780123710632324],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_41.jpg"
        }, {
            "embedding": [12.601875305175781, 1.361872911453247],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_7.jpg"
        }, {
            "embedding": [9.257712364196777, 1.900925636291504],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_69.jpg"
        }, {
            "embedding": [5.4303717613220215, 3.1653857231140137],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_60.jpg"
        }, {
            "embedding": [3.3491106033325195, 4.917920112609863],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_13.jpg"
        }, {
            "embedding": [1.4819918870925903, 5.720270156860352],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_95.jpg"
        }, {
            "embedding": [1.4369337558746338, 5.827075481414795],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_68.jpg"
        }, {
            "embedding": [1.6525565385818481, 5.208877086639404],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_8.jpg"
        }, {
            "embedding": [1.5119726657867432, 5.072149753570557],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_22.jpg"
        }, {
            "embedding": [1.5218850374221802, 5.575826168060303],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_79.jpg"
        }, {
            "embedding": [6.588163375854492, 2.2649152278900146],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_17.jpg"
        }, {
            "embedding": [7.06281852722168, 2.0487747192382812],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_25.jpg"
        }, {
            "embedding": [4.694154262542725, 4.119960784912109],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_42.png"
        }, {
            "embedding": [6.782059669494629, 0.7131193280220032],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_9.jpg"
        }, {
            "embedding": [11.828570365905762, 2.1067159175872803],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_71.jpg"
        }, {
            "embedding": [9.015071868896484, 2.0913236141204834],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_34.jpg"
        }, {
            "embedding": [1.9759912490844727, 5.1624345779418945],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_6.jpg"
        }, {
            "embedding": [8.478805541992188, 1.670566439628601],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_20.jpg"
        }, {
            "embedding": [11.22232437133789, 1.733524203300476],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_98.jpg"
        }, {
            "embedding": [2.3549609184265137, 5.648284912109375],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_19.jpg"
        }, {
            "embedding": [9.15620231628418, 2.104875087738037],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_61.jpg"
        }, {
            "embedding": [1.6285874843597412, 5.2255425453186035],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_85.jpg"
        }, {
            "embedding": [7.538961887359619, 1.5696334838867188],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_74.jpg"
        }, {
            "embedding": [7.3906965255737305, 2.7493765354156494],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_53.jpg"
        }, {
            "embedding": [1.2157354354858398, 5.007662296295166],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_64.jpg"
        }, {
            "embedding": [10.57669448852539, 0.6561394333839417],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_92.jpg"
        }, {
            "embedding": [1.149579644203186, 4.962620735168457],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_27.jpg"
        }, {
            "embedding": [0.8305121660232544, 5.133515357971191],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_72.jpg"
        }, {
            "embedding": [13.12434196472168, 1.9826151132583618],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_39.png"
        }, {
            "embedding": [6.608966827392578, 3.1267693042755127],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_73.jpg"
        }, {
            "embedding": [9.56481647491455, 0.8866716623306274],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_96.jpg"
        }, {
            "embedding": [8.791955947875977, 2.9156014919281006],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_11.jpg"
        }, {
            "embedding": [2.084179401397705, 5.542152404785156],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_67.jpg"
        }, {
            "embedding": [8.669736862182617, 1.8829209804534912],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_58.jpg"
        }, {
            "embedding": [8.570103645324707, 2.0154802799224854],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_29.png"
        }, {
            "embedding": [1.2097790241241455, 5.038174629211426],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_62.jpg"
        }, {
            "embedding": [3.9888551235198975, 4.680859088897705],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_30.jpg"
        }, {
            "embedding": [8.791850090026855, 0.6909805536270142],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_5.jpg"
        }, {
            "embedding": [2.232750415802002, 5.305366516113281],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_100.jpg"
        }, {
            "embedding": [4.307307720184326, 4.213902473449707],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_15.jpg"
        }, {
            "embedding": [5.175726890563965, 3.297199010848999],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_35.jpg"
        }, {
            "embedding": [8.602063179016113, 0.6523491740226746],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_14.jpg"
        }, {
            "embedding": [8.628649711608887, 2.1943519115448],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_63.jpg"
        }, {
            "embedding": [1.6884236335754395, 5.296461582183838],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_24.jpg"
        }, {
            "embedding": [1.068932294845581, 4.651495456695557],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_99.jpg"
        }, {
            "embedding": [1.9527831077575684, 5.510526180267334],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_32.jpg"
        }, {
            "embedding": [6.959521770477295, 2.759105682373047],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_37.jpg"
        }, {
            "embedding": [5.015016555786133, 3.2827706336975098],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_28.jpg"
        }, {
            "embedding": [2.2270796298980713, 5.619140625],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_54.jpg"
        }, {
            "embedding": [3.0599396228790283, 4.7619309425354],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_36.jpg"
        }, {
            "embedding": [5.971190929412842, 2.66259503364563],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_31.jpg"
        }, {
            "embedding": [1.0244251489639282, 4.7355637550354],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_2.jpg"
        }, {
            "embedding": [2.1818933486938477, 5.321163177490234],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_3.jpg"
        }, {
            "embedding": [1.6266206502914429, 5.040877819061279],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_26.jpg"
        }, {
            "embedding": [6.045540809631348, 2.738473415374756],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_43.jpg"
        }, {
            "embedding": [12.147143363952637, 1.6046411991119385],
            "label": 13,
            "category": "cucumber",
            "sprite_path": "static/dump/umap/static/train/ginger/Image_18.jpg"
        }, {
            "embedding": [9.602310180664062, 1.2647274732589722],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_89.jpg"
        }, {
            "embedding": [1.595786452293396, 5.4156413078308105],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_1.jpg"
        }, {
            "embedding": [9.281936645507812, 1.7224332094192505],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_16.jpg"
        }, {
            "embedding": [2.8911783695220947, 5.680056571960449],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_57.jpg"
        }, {
            "embedding": [11.63548755645752, 2.506783962249756],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_56.jpg"
        }, {
            "embedding": [8.159193992614746, 0.3596717119216919],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_45.jpg"
        }, {
            "embedding": [2.6548423767089844, 5.678473949432373],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_40.jpg"
        }, {
            "embedding": [12.665567398071289, 1.8741346597671509],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_59.jpg"
        }, {
            "embedding": [2.3835995197296143, 6.140426158905029],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_4.jpg"
        }, {
            "embedding": [2.734046697616577, 5.635578632354736],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_41.jpg"
        }, {
            "embedding": [5.178133010864258, 3.0147602558135986],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_69.jpg"
        }, {
            "embedding": [6.062092304229736, 2.736862897872925],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_13.jpg"
        }, {
            "embedding": [1.7687938213348389, 5.704745292663574],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_49.jpg"
        }, {
            "embedding": [1.7582056522369385, 5.944521427154541],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_91.jpg"
        }, {
            "embedding": [1.395062804222107, 5.768869400024414],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_95.jpg"
        }, {
            "embedding": [8.004833221435547, 0.6735020279884338],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_86.jpg"
        }, {
            "embedding": [8.868814468383789, 1.4089584350585938],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_68.jpg"
        }, {
            "embedding": [9.414182662963867, 2.869992971420288],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_23.jpg"
        }, {
            "embedding": [2.7853221893310547, 5.765252590179443],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_8.jpg"
        }, {
            "embedding": [12.875581741333008, 2.649563789367676],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_48.png"
        }, {
            "embedding": [11.56757640838623, 1.1332100629806519],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_79.jpg"
        }, {
            "embedding": [11.296409606933594, 2.157961845397949],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_77.jpg"
        }, {
            "embedding": [11.764498710632324, 1.4355429410934448],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_25.jpg"
        }, {
            "embedding": [1.4222922325134277, 5.682852745056152],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_46.jpg"
        }, {
            "embedding": [2.6711232662200928, 5.710614204406738],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_9.jpg"
        }, {
            "embedding": [5.626681327819824, 2.9532663822174072],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_71.jpg"
        }, {
            "embedding": [13.372712135314941, 1.325835943222046],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_43.png"
        }, {
            "embedding": [1.596848487854004, 5.7899909019470215],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_6.jpg"
        }, {
            "embedding": [13.128946304321289, 2.004908323287964],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_53.png"
        }, {
            "embedding": [1.5711719989776611, 5.788005352020264],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_98.jpg"
        }, {
            "embedding": [6.732687473297119, 0.8316441774368286],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_47.jpg"
        }, {
            "embedding": [1.031583547592163, 5.329155445098877],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_81.jpeg"
        }, {
            "embedding": [3.1450142860412598, 5.756709098815918],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_84.jpg"
        }, {
            "embedding": [10.046612739562988, 1.0445828437805176],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_85.jpg"
        }, {
            "embedding": [12.813132286071777, 2.5969741344451904],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_88.png"
        }, {
            "embedding": [0.738820493221283, 5.073353290557861],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_64.jpg"
        }, {
            "embedding": [9.213367462158203, 1.4398120641708374],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_92.jpg"
        }, {
            "embedding": [9.477059364318848, 2.447171449661255],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_27.jpg"
        }, {
            "embedding": [1.3502769470214844, 5.743849277496338],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_55.jpg"
        }, {
            "embedding": [1.7537181377410889, 5.752445220947266],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_44.jpg"
        }, {
            "embedding": [13.409677505493164, 1.285899043083191],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_72.jpg"
        }, {
            "embedding": [2.5343477725982666, 5.602209568023682],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_73.jpg"
        }, {
            "embedding": [11.237951278686523, 3.0128722190856934],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_96.jpg"
        }, {
            "embedding": [2.405552387237549, 6.1264166831970215],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_52.jpg"
        }, {
            "embedding": [3.337604522705078, 5.474809646606445],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_90.jpg"
        }, {
            "embedding": [8.124635696411133, 0.6296648383140564],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_82.jpg"
        }, {
            "embedding": [7.394367694854736, 0.808040201663971],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_67.jpg"
        }, {
            "embedding": [1.2535300254821777, 4.516881465911865],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_50.jpg"
        }, {
            "embedding": [2.9579665660858154, 5.776070594787598],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_51.jpeg"
        }, {
            "embedding": [2.836402177810669, 5.734602451324463],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_58.png"
        }, {
            "embedding": [13.264573097229004, 2.050233840942383],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_97.jpg"
        }, {
            "embedding": [2.3979554176330566, 6.132845878601074],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_62.jpg"
        }, {
            "embedding": [2.4004833698272705, 6.135147571563721],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_5.jpg"
        }, {
            "embedding": [2.4347641468048096, 6.151455402374268],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_100.jpg"
        }, {
            "embedding": [2.8029983043670654, 5.745540142059326],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_15.jpg"
        }, {
            "embedding": [8.03795051574707, 2.6656296253204346],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_61.png"
        }, {
            "embedding": [13.385660171508789, 1.3177597522735596],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_14.jpg"
        }, {
            "embedding": [1.387258529663086, 5.5514655113220215],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_76.jpg"
        }, {
            "embedding": [7.031069755554199, 3.425619125366211],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_63.jpg"
        }, {
            "embedding": [2.6303460597991943, 5.45672082901001],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_83.png"
        }, {
            "embedding": [12.89682388305664, 2.667463779449463],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_75.jpg"
        }, {
            "embedding": [1.4073877334594727, 5.11380672454834],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_24.jpg"
        }, {
            "embedding": [6.938725471496582, 3.2090330123901367],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_32.jpg"
        }, {
            "embedding": [10.2437162399292, 1.663487434387207],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_80.png"
        }, {
            "embedding": [12.873855590820312, 2.871138572692871],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_65.png"
        }, {
            "embedding": [12.829498291015625, 2.8245556354522705],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_37.jpg"
        }, {
            "embedding": [9.255532264709473, 1.71993887424469],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_28.jpg"
        }, {
            "embedding": [1.6683728694915771, 5.953117370605469],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_54.jpg"
        }, {
            "embedding": [1.4511908292770386, 5.735291481018066],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_93.jpg"
        }, {
            "embedding": [1.7110230922698975, 5.521800518035889],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_42.jpg"
        }, {
            "embedding": [2.65366792678833, 5.635677814483643],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_31.jpg"
        }, {
            "embedding": [11.734619140625, 1.574143648147583],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_3.jpg"
        }, {
            "embedding": [1.3599058389663696, 5.8313164710998535],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_66.jpg"
        }, {
            "embedding": [8.320501327514648, 0.2587375044822693],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/banana/Image_11.png"
        }, {
            "embedding": [12.502181053161621, 0.8848655819892883],
            "label": 1,
            "category": "banana",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_16.jpg"
        }, {
            "embedding": [8.88763427734375, 2.2024762630462646],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_57.jpg"
        }, {
            "embedding": [8.364654541015625, 0.036751341074705124],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_12.jpg"
        }, {
            "embedding": [8.449584007263184, 0.008106534369289875],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_94.jpg"
        }, {
            "embedding": [2.1002631187438965, 5.339147090911865],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_40.jpg"
        }, {
            "embedding": [1.861556887626648, 4.576339244842529],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_10.jpg"
        }, {
            "embedding": [6.051462173461914, 3.1030304431915283],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_21.jpg"
        }, {
            "embedding": [12.63289737701416, 2.403916358947754],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_78.jpg"
        }, {
            "embedding": [6.462453365325928, 2.0901811122894287],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_4.jpg"
        }, {
            "embedding": [12.585714340209961, 2.0963406562805176],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_38.jpg"
        }, {
            "embedding": [8.471461296081543, 0.500670313835144],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_41.jpg"
        }, {
            "embedding": [8.689085960388184, -0.10609295219182968],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_69.jpg"
        }, {
            "embedding": [6.684469223022461, 3.1406943798065186],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_60.jpg"
        }, {
            "embedding": [7.2074480056762695, 2.3089170455932617],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_13.jpg"
        }, {
            "embedding": [6.637607574462891, 2.966153621673584],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_95.jpg"
        }, {
            "embedding": [6.654285430908203, 3.00297474861145],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_86.jpg"
        }, {
            "embedding": [6.093450546264648, 2.5581376552581787],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_68.jpg"
        }, {
            "embedding": [12.48811149597168, 2.418614387512207],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_23.jpg"
        }, {
            "embedding": [8.374523162841797, -0.039800893515348434],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_8.jpg"
        }, {
            "embedding": [6.317269802093506, 3.143477439880371],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_22.jpg"
        }, {
            "embedding": [8.921578407287598, 0.49489134550094604],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_77.jpg"
        }, {
            "embedding": [9.610998153686523, 1.060733437538147],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_25.jpg"
        }, {
            "embedding": [3.6969316005706787, 4.873922348022461],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_9.jpg"
        }, {
            "embedding": [7.45367431640625, 2.7616803646087646],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_71.jpg"
        }, {
            "embedding": [8.784463882446289, 0.41002488136291504],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_34.jpg"
        }, {
            "embedding": [5.9243316650390625, 3.2707178592681885],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_81.jpg"
        }, {
            "embedding": [7.62781286239624, 1.2339311838150024],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_98.jpg"
        }, {
            "embedding": [10.151065826416016, 0.21074670553207397],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_19.jpg"
        }, {
            "embedding": [9.923820495605469, 0.7813304662704468],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_88.jpg"
        }, {
            "embedding": [7.862173557281494, 0.9814710021018982],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_29.jpg"
        }, {
            "embedding": [6.763095378875732, 3.1429102420806885],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_84.jpg"
        }, {
            "embedding": [2.5994479656219482, 5.022014617919922],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_85.jpg"
        }, {
            "embedding": [2.15464186668396, 4.413779258728027],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_53.jpg"
        }, {
            "embedding": [12.554466247558594, 2.078031301498413],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_64.jpg"
        }, {
            "embedding": [9.018458366394043, 0.12288132309913635],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_92.jpg"
        }, {
            "embedding": [6.412114143371582, 3.2193429470062256],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_55.jpg"
        }, {
            "embedding": [2.7543792724609375, 5.146585464477539],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_73.jpg"
        }, {
            "embedding": [6.600869178771973, 2.383634090423584],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_90.jpg"
        }, {
            "embedding": [8.656702995300293, 3.6210293769836426],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_11.jpg"
        }, {
            "embedding": [4.782077312469482, 4.582741737365723],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_80.jpg"
        }, {
            "embedding": [9.338558197021484, 2.587095022201538],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_67.jpg"
        }, {
            "embedding": [5.922877311706543, 3.184607982635498],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_50.jpg"
        }, {
            "embedding": [8.451127052307129, 0.9845722317695618],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_58.jpg"
        }, {
            "embedding": [8.444951057434082, 0.8357977867126465],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_97.jpg"
        }, {
            "embedding": [6.4292097091674805, 3.3362627029418945],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_62.jpg"
        }, {
            "embedding": [3.039283275604248, 4.925619125366211],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_30.jpg"
        }, {
            "embedding": [5.214362144470215, 3.5697426795959473],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_5.jpg"
        }, {
            "embedding": [3.3875997066497803, 4.457362174987793],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_100.jpg"
        }, {
            "embedding": [12.554510116577148, 2.0199227333068848],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_70.jpg"
        }, {
            "embedding": [9.054841995239258, 0.9092587828636169],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_15.jpg"
        }, {
            "embedding": [8.997772216796875, 0.9642856121063232],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_35.jpg"
        }, {
            "embedding": [1.3976472616195679, 4.659487724304199],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_14.jpg"
        }, {
            "embedding": [2.8036890029907227, 5.397487640380859],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_39.jpg"
        }, {
            "embedding": [12.423826217651367, 1.2438157796859741],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_76.jpg"
        }, {
            "embedding": [9.159067153930664, 0.7925960421562195],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_63.jpg"
        }, {
            "embedding": [7.658196449279785, 2.728642702102661],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_99.jpg"
        }, {
            "embedding": [10.604286193847656, 0.9635106921195984],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_32.jpg"
        }, {
            "embedding": [8.359786033630371, 0.8722228407859802],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_37.jpg"
        }, {
            "embedding": [7.132339000701904, 2.409176826477051],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_28.jpg"
        }, {
            "embedding": [7.524590015411377, 3.040095090866089],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_54.jpg"
        }, {
            "embedding": [12.383946418762207, 1.416783332824707],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_93.jpg"
        }, {
            "embedding": [3.390631914138794, 4.765294075012207],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_36.jpg"
        }, {
            "embedding": [8.949261665344238, 0.15412577986717224],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_42.jpg"
        }, {
            "embedding": [8.709056854248047, 2.1922688484191895],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_2.jpg"
        }, {
            "embedding": [10.114659309387207, 0.2534871995449066],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_3.jpg"
        }, {
            "embedding": [10.615245819091797, 0.9506975412368774],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_66.jpg"
        }, {
            "embedding": [6.872193336486816, 3.3869476318359375],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_87.jpg"
        }, {
            "embedding": [11.51216983795166, 1.1383076906204224],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_43.jpg"
        }, {
            "embedding": [7.38065242767334, 2.3053839206695557],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetpotato/Image_18.jpg"
        }, {
            "embedding": [3.112576484680176, 5.11337423324585],
            "label": 32,
            "category": "pear",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_89.jpg"
        }, {
            "embedding": [9.148100852966309, 2.686324119567871],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_65.jpg"
        }, {
            "embedding": [10.910550117492676, 1.6891611814498901],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_1.jpg"
        }, {
            "embedding": [3.1546473503112793, 5.769689083099365],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_57.jpg"
        }, {
            "embedding": [12.288453102111816, 1.5361888408660889],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_12.jpg"
        }, {
            "embedding": [7.396373271942139, 0.8568786978721619],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_33.jpg"
        }, {
            "embedding": [6.685033321380615, 0.9815616011619568],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_45.jpg"
        }, {
            "embedding": [11.847559928894043, 2.3204782009124756],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_94.jpg"
        }, {
            "embedding": [8.384119033813477, 1.7438286542892456],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_40.jpg"
        }, {
            "embedding": [12.056061744689941, 1.8935658931732178],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_10.jpg"
        }, {
            "embedding": [8.973072052001953, 1.545507550239563],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_21.jpg"
        }, {
            "embedding": [7.677276134490967, 1.14722740650177],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_78.jpg"
        }, {
            "embedding": [7.088689804077148, 1.1924805641174316],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_59.jpg"
        }, {
            "embedding": [1.8328032493591309, 4.85212516784668],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_4.jpg"
        }, {
            "embedding": [7.758871555328369, 0.9863623380661011],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_38.jpg"
        }, {
            "embedding": [9.408207893371582, 1.5450921058654785],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_41.jpg"
        }, {
            "embedding": [6.528411865234375, 1.8780657052993774],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_7.jpg"
        }, {
            "embedding": [6.39713716506958, 1.8047997951507568],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_69.jpg"
        }, {
            "embedding": [12.628957748413086, 1.5170576572418213],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_48.jpg"
        }, {
            "embedding": [6.950979232788086, 1.8414682149887085],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_60.jpg"
        }, {
            "embedding": [7.863150596618652, 1.2141891717910767],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_13.jpg"
        }, {
            "embedding": [1.6274077892303467, 4.617191791534424],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_95.jpg"
        }, {
            "embedding": [7.970905303955078, 0.8809003233909607],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_23.jpg"
        }, {
            "embedding": [7.878333568572998, 0.8870187997817993],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_8.jpg"
        }, {
            "embedding": [6.849057197570801, 0.7751299738883972],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_22.jpg"
        }, {
            "embedding": [12.730191230773926, 2.5822250843048096],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_79.jpg"
        }, {
            "embedding": [10.361727714538574, 1.2863177061080933],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_17.jpg"
        }, {
            "embedding": [2.7148966789245605, 5.470496654510498],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_77.jpg"
        }, {
            "embedding": [7.0236711502075195, 0.9487074017524719],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_25.jpg"
        }, {
            "embedding": [10.608358383178711, 2.650925397872925],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_46.jpg"
        }, {
            "embedding": [7.347084999084473, 0.8469004034996033],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_9.jpg"
        }, {
            "embedding": [3.1215660572052, 5.809775352478027],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_71.jpg"
        }, {
            "embedding": [7.161835193634033, 1.0225602388381958],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_34.jpg"
        }, {
            "embedding": [11.724041938781738, 1.0753034353256226],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_6.jpg"
        }, {
            "embedding": [1.4975587129592896, 4.735479831695557],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_20.jpg"
        }, {
            "embedding": [10.181209564208984, 1.8971675634384155],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_98.jpg"
        }, {
            "embedding": [7.861447334289551, 0.9013696312904358],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_47.jpg"
        }, {
            "embedding": [7.253320217132568, 1.1809909343719482],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_19.jpg"
        }, {
            "embedding": [7.895999431610107, 0.9384538531303406],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_88.jpg"
        }, {
            "embedding": [8.80057430267334, 0.7368957996368408],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_29.jpg"
        }, {
            "embedding": [8.048163414001465, 0.8075108528137207],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_61.jpg"
        }, {
            "embedding": [12.848956108093262, 1.514487862586975],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_84.jpg"
        }, {
            "embedding": [8.132307052612305, 1.2249867916107178],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_85.jpg"
        }, {
            "embedding": [8.042325019836426, 0.8015699982643127],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_74.jpg"
        }, {
            "embedding": [12.383347511291504, 2.6775641441345215],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_56.png"
        }, {
            "embedding": [9.525424003601074, 0.904038667678833],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_53.jpg"
        }, {
            "embedding": [1.185204267501831, 4.45919132232666],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_27.jpg"
        }, {
            "embedding": [11.295945167541504, 2.8290276527404785],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_44.jpg"
        }, {
            "embedding": [13.345434188842773, 2.113590717315674],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_72.jpg"
        }, {
            "embedding": [7.035093307495117, 2.0235602855682373],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_75.png"
        }, {
            "embedding": [8.13815975189209, 1.2002350091934204],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_96.jpg"
        }, {
            "embedding": [7.641646385192871, 0.6851329803466797],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_52.jpg"
        }, {
            "embedding": [8.924934387207031, 1.645481824874878],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_90.jpg"
        }, {
            "embedding": [12.07446575164795, 2.4799013137817383],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_30.png"
        }, {
            "embedding": [7.760343551635742, 1.0254912376403809],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_83.jpg"
        }, {
            "embedding": [7.114261627197266, 1.4566400051116943],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_11.jpg"
        }, {
            "embedding": [6.761966228485107, 0.9765005707740784],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_80.jpg"
        }, {
            "embedding": [12.937908172607422, 1.9826767444610596],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_67.jpg"
        }, {
            "embedding": [12.4190673828125, 1.6594988107681274],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_50.jpg"
        }, {
            "embedding": [7.50401496887207, 0.8028295040130615],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_58.jpg"
        }, {
            "embedding": [12.69809341430664, 2.520972490310669],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_97.jpg"
        }, {
            "embedding": [8.057580947875977, 0.6292520761489868],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_55.png"
        }, {
            "embedding": [7.920629501342773, 0.7940122485160828],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_62.jpg"
        }, {
            "embedding": [6.682565212249756, 0.8304274082183838],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_5.jpg"
        }, {
            "embedding": [9.477774620056152, 1.6160866022109985],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_100.jpg"
        }, {
            "embedding": [9.742487907409668, 1.6022387742996216],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_70.jpg"
        }, {
            "embedding": [8.38052749633789, 1.7926386594772339],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_35.jpg"
        }, {
            "embedding": [9.406828880310059, 1.6146132946014404],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_14.jpg"
        }, {
            "embedding": [12.705998420715332, 2.601638078689575],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_39.jpg"
        }, {
            "embedding": [2.920391321182251, 5.377716064453125],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_76.jpg"
        }, {
            "embedding": [7.672327518463135, 1.0298383235931396],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_63.jpg"
        }, {
            "embedding": [12.814916610717773, 1.8536651134490967],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_24.jpg"
        }, {
            "embedding": [10.46224308013916, 1.3999863862991333],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_99.jpg"
        }, {
            "embedding": [10.183751106262207, 1.6712334156036377],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_32.jpg"
        }, {
            "embedding": [7.977077960968018, 0.8830304741859436],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_37.jpg"
        }, {
            "embedding": [11.139800071716309, 2.6552376747131348],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_51.jpg"
        }, {
            "embedding": [6.426191806793213, 1.8174843788146973],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_54.jpg"
        }, {
            "embedding": [12.613930702209473, 2.5468533039093018],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_93.jpg"
        }, {
            "embedding": [1.8160759210586548, 4.566829204559326],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_36.jpg"
        }, {
            "embedding": [7.2721405029296875, 1.760717749595642],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_42.jpg"
        }, {
            "embedding": [9.997745513916016, 0.5150563716888428],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_31.jpg"
        }, {
            "embedding": [3.0964741706848145, 5.792680263519287],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_64.png"
        }, {
            "embedding": [1.3094829320907593, 4.397834777832031],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_2.jpg"
        }, {
            "embedding": [1.4922760725021362, 5.210652828216553],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_3.jpg"
        }, {
            "embedding": [6.486749172210693, 1.616798758506775],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_26.jpg"
        }, {
            "embedding": [1.4659931659698486, 5.782201766967773],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_66.jpg"
        }, {
            "embedding": [8.374637603759766, 1.725071907043457],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_87.jpg"
        }, {
            "embedding": [7.947852611541748, 0.9042125344276428],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/sweetcorn/Image_43.jpg"
        }, {
            "embedding": [8.551126480102539, 0.9915638566017151],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_89.jpg"
        }, {
            "embedding": [2.1963536739349365, 5.273867130279541],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_65.jpg"
        }, {
            "embedding": [8.117684364318848, 0.73040771484375],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_1.jpg"
        }, {
            "embedding": [6.87174129486084, 1.6562504768371582],
            "label": 31,
            "category": "turnip",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_17.jpeg"
        }, {
            "embedding": [0.6678940057754517, 5.34890079498291],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_57.jpg"
        }, {
            "embedding": [8.685819625854492, 0.7105110287666321],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_12.jpg"
        }, {
            "embedding": [12.701786994934082, 0.921297550201416],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_56.jpg"
        }, {
            "embedding": [8.469969749450684, 0.23224835097789764],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_94.jpg"
        }, {
            "embedding": [8.539665222167969, 0.3089427947998047],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_40.jpg"
        }, {
            "embedding": [8.407059669494629, 0.4353504180908203],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_78.jpg"
        }, {
            "embedding": [9.36636734008789, 0.14410929381847382],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_59.jpg"
        }, {
            "embedding": [12.713225364685059, 0.9645377993583679],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_41.jpg"
        }, {
            "embedding": [1.137539267539978, 5.176629066467285],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_7.jpg"
        }, {
            "embedding": [1.198228359222412, 5.608578681945801],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_69.jpg"
        }, {
            "embedding": [1.9608933925628662, 4.4002366065979],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_44.png"
        }, {
            "embedding": [0.9349002242088318, 4.45260763168335],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_60.jpg"
        }, {
            "embedding": [1.7922744750976562, 5.973878383636475],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_13.jpg"
        }, {
            "embedding": [8.485587120056152, 0.42867371439933777],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_49.jpg"
        }, {
            "embedding": [1.0082799196243286, 4.410578727722168],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_91.jpg"
        }, {
            "embedding": [0.6266012191772461, 5.383181095123291],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_86.jpg"
        }, {
            "embedding": [0.6934479475021362, 5.278109073638916],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_14.jpeg"
        }, {
            "embedding": [8.391737937927246, 0.5349963903427124],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_23.jpg"
        }, {
            "embedding": [8.185604095458984, 2.387003183364868],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_79.jpg"
        }, {
            "embedding": [8.702717781066895, 0.31829702854156494],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_77.jpg"
        }, {
            "embedding": [12.883102416992188, 1.5579484701156616],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_25.jpg"
        }, {
            "embedding": [11.586654663085938, 2.242086410522461],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_46.jpg"
        }, {
            "embedding": [0.7876222729682922, 5.452307224273682],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_9.jpg"
        }, {
            "embedding": [12.430673599243164, 1.7511099576950073],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_73.jpeg"
        }, {
            "embedding": [0.9603478312492371, 4.405385971069336],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_71.jpg"
        }, {
            "embedding": [1.0105564594268799, 4.384755611419678],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_34.jpg"
        }, {
            "embedding": [8.210752487182617, 0.18198898434638977],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_81.jpg"
        }, {
            "embedding": [8.47627067565918, 0.6628744602203369],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_6.jpg"
        }, {
            "embedding": [8.823454856872559, 3.6087844371795654],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_20.jpg"
        }, {
            "embedding": [0.8177034854888916, 4.516570091247559],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_98.jpg"
        }, {
            "embedding": [8.23459529876709, 1.0510488748550415],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_47.jpg"
        }, {
            "embedding": [6.601207256317139, 2.89884090423584],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_88.jpg"
        }, {
            "embedding": [6.696526050567627, 1.910728096961975],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_29.jpg"
        }, {
            "embedding": [0.7133560180664062, 5.1523566246032715],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_61.jpg"
        }, {
            "embedding": [1.260166883468628, 4.542436599731445],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_84.jpg"
        }, {
            "embedding": [10.561217308044434, 1.2492698431015015],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_85.jpg"
        }, {
            "embedding": [8.5645751953125, 1.3681535720825195],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_53.jpg"
        }, {
            "embedding": [0.6090759038925171, 5.353562355041504],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_64.jpg"
        }, {
            "embedding": [7.701903820037842, 1.6095393896102905],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_27.jpg"
        }, {
            "embedding": [0.9692146182060242, 4.380866527557373],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_55.jpg"
        }, {
            "embedding": [8.100407600402832, 1.4019359350204468],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_62.png"
        }, {
            "embedding": [0.5984014272689819, 5.329580307006836],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_72.jpg"
        }, {
            "embedding": [1.7247592210769653, 4.904839515686035],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_96.jpg"
        }, {
            "embedding": [5.236039161682129, 3.1513383388519287],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_52.jpg"
        }, {
            "embedding": [8.599143028259277, 0.48825299739837646],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_90.jpg"
        }, {
            "embedding": [13.253808975219727, 1.1854474544525146],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_83.jpg"
        }, {
            "embedding": [8.661259651184082, 0.24859245121479034],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_11.jpg"
        }, {
            "embedding": [6.004802703857422, 3.139463186264038],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_82.jpg"
        }, {
            "embedding": [8.549108505249023, 0.427275151014328],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_67.jpg"
        }, {
            "embedding": [8.230374336242676, 1.386324167251587],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_50.jpg"
        }, {
            "embedding": [5.89304256439209, 2.878019094467163],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_58.jpg"
        }, {
            "embedding": [12.511456489562988, 1.9444305896759033],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_68.png"
        }, {
            "embedding": [11.046149253845215, 1.119141936302185],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_5.jpg"
        }, {
            "embedding": [9.160698890686035, 1.0286701917648315],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_100.jpg"
        }, {
            "embedding": [12.433194160461426, 1.7185604572296143],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_70.jpg"
        }, {
            "embedding": [9.435714721679688, 0.30788034200668335],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_15.jpg"
        }, {
            "embedding": [0.829444944858551, 4.807100772857666],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_35.jpg"
        }, {
            "embedding": [0.7478078007698059, 5.1343464851379395],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_76.jpg"
        }, {
            "embedding": [1.7762304544448853, 5.975644111633301],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_63.jpg"
        }, {
            "embedding": [8.906083106994629, 0.2989785373210907],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_75.jpg"
        }, {
            "embedding": [6.042811393737793, 2.8909287452697754],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_10.jpeg"
        }, {
            "embedding": [0.9170941114425659, 4.420848369598389],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_24.jpg"
        }, {
            "embedding": [12.65500545501709, 1.1760315895080566],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_99.jpg"
        }, {
            "embedding": [8.3888578414917, 1.133092999458313],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_32.jpg"
        }, {
            "embedding": [6.869338035583496, 2.892536163330078],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_80.png"
        }, {
            "embedding": [11.16446304321289, 1.6397743225097656],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_37.jpg"
        }, {
            "embedding": [8.935262680053711, 0.2694758176803589],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_51.jpg"
        }, {
            "embedding": [6.571539402008057, 2.92343807220459],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_28.jpg"
        }, {
            "embedding": [12.386245727539062, 1.4931366443634033],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_54.jpg"
        }, {
            "embedding": [12.808974266052246, 1.7225524187088013],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_93.jpg"
        }, {
            "embedding": [1.151856780052185, 4.386389255523682],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_36.jpg"
        }, {
            "embedding": [12.514203071594238, 2.2338101863861084],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_42.jpg"
        }, {
            "embedding": [0.6633775234222412, 5.338091850280762],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_31.jpg"
        }, {
            "embedding": [8.892027854919434, 0.2463844120502472],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_2.jpg"
        }, {
            "embedding": [7.625233173370361, 0.9043706059455872],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_3.jpg"
        }, {
            "embedding": [0.8419713377952576, 4.517058849334717],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_26.jpg"
        }, {
            "embedding": [0.7270799875259399, 5.319868564605713],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/carrot/Image_66.jpg"
        }, {
            "embedding": [1.969605565071106, 4.680305004119873],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/orange/Image_65.jpg"
        }, {
            "embedding": [0.7649965286254883, 5.068597793579102],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/orange/Image_16.jpg"
        }, {
            "embedding": [5.946799278259277, 3.160449504852295],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/orange/Image_12.jpg"
        }, {
            "embedding": [0.6642848253250122, 5.157297134399414],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/orange/Image_56.jpg"
        }, {
            "embedding": [6.588630676269531, 2.668821096420288],
            "label": 6,
            "category": "eggplant",
            "sprite_path": "static/dump/umap/static/train/orange/Image_33.jpg"
        }, {
            "embedding": [7.669439792633057, 1.3849726915359497],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_45.jpg"
        }, {
            "embedding": [8.735028266906738, 3.538853645324707],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_40.jpg"
        }, {
            "embedding": [6.681546688079834, 0.8737184405326843],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_10.jpg"
        }, {
            "embedding": [6.779246807098389, 1.6874439716339111],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_21.jpg"
        }, {
            "embedding": [8.290785789489746, 2.231902599334717],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_4.jpg"
        }, {
            "embedding": [3.135366916656494, 5.461597919464111],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_38.jpg"
        }, {
            "embedding": [6.677070140838623, 0.8376064300537109],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_7.jpg"
        }, {
            "embedding": [7.954333305358887, 0.20983192324638367],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_13.jpg"
        }, {
            "embedding": [6.66072416305542, 0.9486666321754456],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_95.jpg"
        }, {
            "embedding": [2.2755424976348877, 5.59304666519165],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_68.jpg"
        }, {
            "embedding": [10.99567699432373, 2.116313934326172],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_23.jpg"
        }, {
            "embedding": [2.3767733573913574, 5.738197326660156],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_1.png"
        }, {
            "embedding": [3.0540413856506348, 5.253721714019775],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_22.jpg"
        }, {
            "embedding": [3.7455012798309326, 4.199388027191162],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_79.jpg"
        }, {
            "embedding": [12.59874153137207, 0.615908145904541],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_77.jpg"
        }, {
            "embedding": [11.280467987060547, 0.482207715511322],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_25.jpg"
        }, {
            "embedding": [12.872518539428711, 2.7580888271331787],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_46.jpg"
        }, {
            "embedding": [7.262846946716309, 1.8947927951812744],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_42.png"
        }, {
            "embedding": [9.149169921875, 3.0906224250793457],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_9.jpg"
        }, {
            "embedding": [9.166749000549316, -0.060116805136203766],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_34.jpg"
        }, {
            "embedding": [8.278190612792969, 0.7380790710449219],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_6.jpg"
        }, {
            "embedding": [6.935035228729248, 1.714207410812378],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_20.jpg"
        }, {
            "embedding": [12.097725868225098, 1.533568263053894],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_98.jpg"
        }, {
            "embedding": [7.995692729949951, 0.5290205478668213],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_19.jpg"
        }, {
            "embedding": [6.626467704772949, 0.9858598113059998],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_88.jpg"
        }, {
            "embedding": [7.727829933166504, 0.6921312212944031],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_29.jpg"
        }, {
            "embedding": [7.9569621086120605, 1.563855528831482],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_85.jpg"
        }, {
            "embedding": [7.859042644500732, 0.6447416543960571],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_74.jpg"
        }, {
            "embedding": [12.781410217285156, 2.5205745697021484],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_27.jpg"
        }, {
            "embedding": [8.369969367980957, -0.08625007420778275],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_55.jpg"
        }, {
            "embedding": [6.6820759773254395, 0.8931989669799805],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_44.jpg"
        }, {
            "embedding": [8.166699409484863, 0.24797971546649933],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_72.jpg"
        }, {
            "embedding": [12.129348754882812, 0.7489089369773865],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_73.jpg"
        }, {
            "embedding": [12.852710723876953, 1.3697394132614136],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_52.jpg"
        }, {
            "embedding": [9.335269927978516, 1.1400809288024902],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_90.jpg"
        }, {
            "embedding": [3.206200122833252, 5.840522766113281],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_11.jpg"
        }, {
            "embedding": [11.988578796386719, 1.0098044872283936],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_67.jpg"
        }, {
            "embedding": [8.444628715515137, 0.1546325534582138],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_30.jpg"
        }, {
            "embedding": [1.1926571130752563, 5.15455436706543],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_5.jpg"
        }, {
            "embedding": [8.459088325500488, -0.02718397229909897],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_97.png"
        }, {
            "embedding": [7.811821460723877, 0.9375327229499817],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_100.jpg"
        }, {
            "embedding": [6.834827899932861, 0.8057610392570496],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_70.jpg"
        }, {
            "embedding": [8.462811470031738, 1.3395729064941406],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_15.jpg"
        }, {
            "embedding": [6.672264575958252, 0.8650190830230713],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_14.jpg"
        }, {
            "embedding": [12.849002838134766, 2.778088331222534],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_8.jpeg"
        }, {
            "embedding": [2.2706193923950195, 5.580068588256836],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_76.jpg"
        }, {
            "embedding": [7.447223663330078, 2.02655029296875],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_63.jpg"
        }, {
            "embedding": [6.928601264953613, 0.8760062456130981],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_24.jpg"
        }, {
            "embedding": [2.9780054092407227, 5.230672836303711],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_99.jpg"
        }, {
            "embedding": [9.156896591186523, 1.7426769733428955],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_32.jpg"
        }, {
            "embedding": [11.912657737731934, 2.443331241607666],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_39.jpeg"
        }, {
            "embedding": [12.268121719360352, 1.4008227586746216],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_37.jpg"
        }, {
            "embedding": [7.8316192626953125, 0.709682822227478],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_51.jpg"
        }, {
            "embedding": [6.293589115142822, 1.8121272325515747],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_28.jpg"
        }, {
            "embedding": [2.625763177871704, 5.693652153015137],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_36.jpg"
        }, {
            "embedding": [8.899619102478027, 2.194866895675659],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_84.png"
        }, {
            "embedding": [7.205039978027344, 2.8473916053771973],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_2.jpg"
        }, {
            "embedding": [10.012394905090332, 0.6866810321807861],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_3.jpg"
        }, {
            "embedding": [8.894747734069824, 1.0566412210464478],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_26.jpg"
        }, {
            "embedding": [7.064585208892822, 1.697434425354004],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_87.jpg"
        }, {
            "embedding": [3.104736804962158, 5.357280731201172],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_43.jpg"
        }, {
            "embedding": [1.5979926586151123, 5.755436420440674],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_18.jpg"
        }, {
            "embedding": [7.813769340515137, 0.6811172366142273],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/orange/Image_60.png"
        }, {
            "embedding": [2.6262009143829346, 5.734007835388184],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_89.jpg"
        }, {
            "embedding": [12.948708534240723, 1.9853850603103638],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_65.jpg"
        }, {
            "embedding": [12.879328727722168, 0.8065400123596191],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_1.jpg"
        }, {
            "embedding": [12.451498985290527, 1.968694806098938],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_16.jpg"
        }, {
            "embedding": [12.276841163635254, 2.2311010360717773],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_54.png"
        }, {
            "embedding": [12.817047119140625, 2.6922998428344727],
            "label": 21,
            "category": "cabbage",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_12.jpg"
        }, {
            "embedding": [10.169083595275879, 1.7744545936584473],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_56.jpg"
        }, {
            "embedding": [9.535239219665527, 2.6042096614837646],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_33.jpg"
        }, {
            "embedding": [7.9359588623046875, 2.08499813079834],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_45.jpg"
        }, {
            "embedding": [6.8828277587890625, 3.3271186351776123],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_94.jpg"
        }, {
            "embedding": [12.703657150268555, 1.029812216758728],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_10.jpg"
        }, {
            "embedding": [2.8901219367980957, 4.289373874664307],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_21.jpg"
        }, {
            "embedding": [0.9713265299797058, 5.738309860229492],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_78.jpg"
        }, {
            "embedding": [11.566590309143066, 0.8648850321769714],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_59.jpg"
        }, {
            "embedding": [9.961020469665527, 1.793001413345337],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_4.jpg"
        }, {
            "embedding": [7.887088775634766, 2.0712287425994873],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_41.jpg"
        }, {
            "embedding": [12.189644813537598, 2.153918981552124],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_7.jpg"
        }, {
            "embedding": [12.064279556274414, 0.6632411479949951],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_69.jpg"
        }, {
            "embedding": [12.774742126464844, 0.8439426422119141],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_48.jpg"
        }, {
            "embedding": [6.403102397918701, 3.5332345962524414],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_13.jpg"
        }, {
            "embedding": [9.830802917480469, 2.310293197631836],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_95.jpg"
        }, {
            "embedding": [8.724334716796875, 2.5472137928009033],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_68.jpg"
        }, {
            "embedding": [9.787787437438965, 1.7748571634292603],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_8.jpg"
        }, {
            "embedding": [12.183300971984863, 1.0383539199829102],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_22.jpg"
        }, {
            "embedding": [11.068486213684082, 1.4156317710876465],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_79.jpg"
        }, {
            "embedding": [10.670916557312012, 0.8751506209373474],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_17.jpg"
        }, {
            "embedding": [12.793387413024902, 0.6995824575424194],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_46.jpg"
        }, {
            "embedding": [8.013888359069824, 2.3447675704956055],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_9.jpg"
        }, {
            "embedding": [10.595335006713867, 1.2779245376586914],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_71.jpg"
        }, {
            "embedding": [11.521768569946289, 0.8408632278442383],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_81.jpg"
        }, {
            "embedding": [12.025799751281738, 1.9867011308670044],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_6.jpg"
        }, {
            "embedding": [8.800393104553223, 2.8260412216186523],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_20.jpg"
        }, {
            "embedding": [10.250360488891602, 1.7442878484725952],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_98.jpg"
        }, {
            "embedding": [11.71882438659668, 2.3850595951080322],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_47.jpg"
        }, {
            "embedding": [11.666732788085938, 1.9486315250396729],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_19.jpg"
        }, {
            "embedding": [12.234272003173828, 2.2164034843444824],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_29.jpg"
        }, {
            "embedding": [10.97461223602295, 1.0636744499206543],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_61.jpg"
        }, {
            "embedding": [9.709784507751465, 2.184868335723877],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_84.jpg"
        }, {
            "embedding": [11.640334129333496, 0.8326217532157898],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_74.jpg"
        }, {
            "embedding": [9.146561622619629, 2.35091233253479],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_64.jpg"
        }, {
            "embedding": [10.600982666015625, 1.2821943759918213],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_92.jpg"
        }, {
            "embedding": [6.284167766571045, 3.4459824562072754],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_27.jpg"
        }, {
            "embedding": [10.027618408203125, 1.2484378814697266],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_55.jpg"
        }, {
            "embedding": [7.284097194671631, 3.430086612701416],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_44.jpg"
        }, {
            "embedding": [12.132532119750977, 0.9163009524345398],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_72.jpg"
        }, {
            "embedding": [9.342839241027832, 2.4649813175201416],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_73.jpg"
        }, {
            "embedding": [6.08469295501709, 3.535519599914551],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_96.jpg"
        }, {
            "embedding": [12.568862915039062, 0.7325204610824585],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_11.jpg"
        }, {
            "embedding": [11.451056480407715, 1.6335630416870117],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_82.jpg"
        }, {
            "embedding": [10.951976776123047, 0.7332515120506287],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_80.jpg"
        }, {
            "embedding": [11.778292655944824, 2.4348528385162354],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_26.png"
        }, {
            "embedding": [9.371161460876465, 2.1058802604675293],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_67.jpg"
        }, {
            "embedding": [1.4062755107879639, 5.068512439727783],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_58.jpg"
        }, {
            "embedding": [8.86108112335205, 3.528425931930542],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_97.jpg"
        }, {
            "embedding": [10.500625610351562, 1.1720198392868042],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_62.jpg"
        }, {
            "embedding": [10.580466270446777, 0.4370897710323334],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_30.jpg"
        }, {
            "embedding": [7.344979763031006, 3.5535449981689453],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_5.jpg"
        }, {
            "embedding": [6.500275135040283, 2.2389211654663086],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_100.jpg"
        }, {
            "embedding": [0.9205762147903442, 6.218636512756348],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_38.png"
        }, {
            "embedding": [11.366499900817871, 0.7935479283332825],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_15.jpg"
        }, {
            "embedding": [11.722771644592285, 0.7194657325744629],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_35.jpg"
        }, {
            "embedding": [9.766294479370117, 2.355587959289551],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_14.jpg"
        }, {
            "embedding": [11.085274696350098, 0.9232050776481628],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_39.jpg"
        }, {
            "embedding": [4.584905624389648, 4.179536819458008],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_63.jpg"
        }, {
            "embedding": [11.651391983032227, 0.8183835744857788],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_24.jpg"
        }, {
            "embedding": [10.966214179992676, 1.0789971351623535],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_99.jpg"
        }, {
            "embedding": [13.112744331359863, 0.9041703939437866],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_32.jpg"
        }, {
            "embedding": [11.073513984680176, 1.1265079975128174],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_37.jpg"
        }, {
            "embedding": [9.138514518737793, 2.424459934234619],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_51.jpg"
        }, {
            "embedding": [9.630813598632812, 1.8166546821594238],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_28.jpg"
        }, {
            "embedding": [9.245057106018066, 2.2288246154785156],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_93.jpg"
        }, {
            "embedding": [9.020814895629883, 2.73506498336792],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_36.jpg"
        }, {
            "embedding": [11.013212203979492, 1.12123703956604],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_40.png"
        }, {
            "embedding": [8.239224433898926, 3.401322364807129],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_42.jpg"
        }, {
            "embedding": [10.563600540161133, 1.5294623374938965],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_31.jpg"
        }, {
            "embedding": [8.816774368286133, 2.2834975719451904],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_2.jpg"
        }, {
            "embedding": [5.735827445983887, 3.155040979385376],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_3.jpg"
        }, {
            "embedding": [6.970793724060059, 3.275322675704956],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_66.jpg"
        }, {
            "embedding": [3.3369765281677246, 4.134943008422852],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_87.jpg"
        }, {
            "embedding": [4.703031063079834, 4.265771389007568],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_43.jpg"
        }, {
            "embedding": [6.791763782501221, 3.6886539459228516],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/eggplant/Image_18.jpg"
        }, {
            "embedding": [2.4996745586395264, 4.49329137802124],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_65.jpg"
        }, {
            "embedding": [12.647040367126465, 0.7387545108795166],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_1.jpg"
        }, {
            "embedding": [12.806024551391602, 0.6796331405639648],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_16.jpg"
        }, {
            "embedding": [10.522619247436523, 1.276572823524475],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_57.jpg"
        }, {
            "embedding": [8.798137664794922, 2.174943208694458],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_12.jpg"
        }, {
            "embedding": [9.893535614013672, 0.09862731397151947],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_56.jpg"
        }, {
            "embedding": [8.586712837219238, 1.9719547033309937],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_33.jpg"
        }, {
            "embedding": [11.35908031463623, 0.7769574522972107],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_45.jpg"
        }, {
            "embedding": [12.786680221557617, 0.6291067600250244],
            "label": 11,
            "category": "raddish",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_40.jpg"
        }, {
            "embedding": [11.49968433380127, 1.776343822479248],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_10.jpg"
        }, {
            "embedding": [3.9520299434661865, 4.386490345001221],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_21.jpg"
        }, {
            "embedding": [2.4298737049102783, 4.558565139770508],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_59.jpg"
        }, {
            "embedding": [8.546333312988281, 3.1686511039733887],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_4.jpg"
        }, {
            "embedding": [4.40392541885376, 4.798878192901611],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_38.jpg"
        }, {
            "embedding": [7.592985153198242, 3.2825539112091064],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_41.jpg"
        }, {
            "embedding": [3.5488924980163574, 4.880150318145752],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_7.jpg"
        }, {
            "embedding": [4.6573333740234375, 4.685800075531006],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_69.jpg"
        }, {
            "embedding": [8.41281795501709, 0.7110260725021362],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_60.jpg"
        }, {
            "embedding": [12.305055618286133, 1.4040606021881104],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_13.jpg"
        }, {
            "embedding": [2.3991377353668213, 4.664292812347412],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_91.jpg"
        }, {
            "embedding": [13.322705268859863, 2.096898078918457],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_68.jpg"
        }, {
            "embedding": [4.313233375549316, 4.890805721282959],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_23.jpg"
        }, {
            "embedding": [8.639284133911133, 0.5991050004959106],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_8.jpg"
        }, {
            "embedding": [8.886856079101562, 1.7736798524856567],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_22.jpg"
        }, {
            "embedding": [2.1910152435302734, 4.747632026672363],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_79.jpg"
        }, {
            "embedding": [6.551511764526367, 3.458085060119629],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_17.jpg"
        }, {
            "embedding": [12.709888458251953, 0.944502592086792],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_77.jpg"
        }, {
            "embedding": [2.740541696548462, 4.485433101654053],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_25.jpg"
        }, {
            "embedding": [9.849913597106934, 0.03273870050907135],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_46.jpg"
        }, {
            "embedding": [3.7475502490997314, 4.94549560546875],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_9.jpg"
        }, {
            "embedding": [8.629523277282715, 1.3700251579284668],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_71.jpg"
        }, {
            "embedding": [9.930787086486816, -0.10269974917173386],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_6.jpg"
        }, {
            "embedding": [9.187176704406738, 0.8308241963386536],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_20.jpg"
        }, {
            "embedding": [9.303689956665039, -0.00015865114983171225],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_19.jpg"
        }, {
            "embedding": [7.566349029541016, 2.8593385219573975],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_88.jpg"
        }, {
            "embedding": [4.464966297149658, 4.799539089202881],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_29.jpg"
        }, {
            "embedding": [10.313153266906738, 1.617712378501892],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_61.jpg"
        }, {
            "embedding": [12.90779972076416, 0.6933534741401672],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_74.jpg"
        }, {
            "embedding": [8.830094337463379, 1.743784785270691],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_64.jpg"
        }, {
            "embedding": [2.7985541820526123, 4.364370822906494],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_89.png"
        }, {
            "embedding": [3.0276825428009033, 4.559671878814697],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_27.jpg"
        }, {
            "embedding": [2.4674956798553467, 4.5398640632629395],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_44.jpg"
        }, {
            "embedding": [12.859334945678711, 0.8787873983383179],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_72.jpg"
        }, {
            "embedding": [8.897274017333984, 1.6434394121170044],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_96.jpg"
        }, {
            "embedding": [8.117745399475098, 1.2356224060058594],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_52.jpg"
        }, {
            "embedding": [2.765408992767334, 4.307798385620117],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_83.jpg"
        }, {
            "embedding": [9.17016315460205, 1.0950385332107544],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_11.jpg"
        }, {
            "embedding": [10.551495552062988, 0.4023998975753784],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_50.jpg"
        }, {
            "embedding": [13.371387481689453, 1.3171857595443726],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_58.jpg"
        }, {
            "embedding": [8.716294288635254, 1.5688079595565796],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_97.jpg"
        }, {
            "embedding": [7.121618270874023, 3.2989113330841064],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_30.jpg"
        }, {
            "embedding": [7.530813217163086, 2.165311813354492],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_5.jpg"
        }, {
            "embedding": [3.9599950313568115, 4.430055141448975],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_100.jpg"
        }, {
            "embedding": [8.214146614074707, 1.1659507751464844],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_67.png"
        }, {
            "embedding": [9.882110595703125, 1.847040057182312],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_70.jpg"
        }, {
            "embedding": [7.5321502685546875, 2.874767780303955],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_15.jpg"
        }, {
            "embedding": [8.31539535522461, 0.6571667194366455],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_35.jpg"
        }, {
            "embedding": [12.090494155883789, 1.1628029346466064],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_28.jpeg"
        }, {
            "embedding": [7.475590705871582, 2.622098207473755],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_14.jpg"
        }, {
            "embedding": [2.488915205001831, 4.313328266143799],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_39.jpg"
        }, {
            "embedding": [4.256964683532715, 4.778663158416748],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_63.jpg"
        }, {
            "embedding": [4.327707767486572, 4.901710510253906],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_75.jpg"
        }, {
            "embedding": [4.415065288543701, 4.910565376281738],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_24.jpg"
        }, {
            "embedding": [12.857437133789062, 0.7632043361663818],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_99.jpg"
        }, {
            "embedding": [7.3909592628479, 3.1968894004821777],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_32.jpg"
        }, {
            "embedding": [7.876770496368408, 1.7937692403793335],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_80.png"
        }, {
            "embedding": [10.11231803894043, 1.0533932447433472],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_37.jpg"
        }, {
            "embedding": [10.580426216125488, 1.5282398462295532],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_51.jpg"
        }, {
            "embedding": [4.475856781005859, 4.784756660461426],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_54.jpg"
        }, {
            "embedding": [12.937028884887695, 0.9824286699295044],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_36.jpg"
        }, {
            "embedding": [2.9027981758117676, 4.507486343383789],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_31.jpg"
        }, {
            "embedding": [12.412494659423828, 0.9965770840644836],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_2.jpg"
        }, {
            "embedding": [12.347146987915039, 1.1601366996765137],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_3.jpg"
        }, {
            "embedding": [4.372618198394775, 4.915270805358887],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_26.jpg"
        }, {
            "embedding": [9.679615020751953, 0.4607328772544861],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_66.jpg"
        }, {
            "embedding": [6.275610446929932, 3.6415224075317383],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_87.jpg"
        }, {
            "embedding": [8.78801155090332, 2.3554141521453857],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_43.jpg"
        }, {
            "embedding": [4.683072566986084, 3.789633274078369],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/pomegranate/Image_18.jpg"
        }, {
            "embedding": [12.554683685302734, 1.143578290939331],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_89.jpg"
        }, {
            "embedding": [9.07050895690918, 0.2053048014640808],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_65.jpg"
        }, {
            "embedding": [9.295350074768066, 1.0667524337768555],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_1.jpg"
        }, {
            "embedding": [2.483760118484497, 4.285231590270996],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_16.jpg"
        }, {
            "embedding": [11.40708065032959, 0.4779442846775055],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_57.jpg"
        }, {
            "embedding": [10.958641052246094, 1.6808449029922485],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_12.jpg"
        }, {
            "embedding": [9.565160751342773, 0.3218892812728882],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_33.jpg"
        }, {
            "embedding": [8.569149017333984, 1.1859341859817505],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_45.jpg"
        }, {
            "embedding": [8.3406343460083, 2.0117554664611816],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_94.jpg"
        }, {
            "embedding": [12.816105842590332, 0.7551175951957703],
            "label": 26,
            "category": "bell pepper",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_40.jpg"
        }, {
            "embedding": [3.042961359024048, 4.581993103027344],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_90.png"
        }, {
            "embedding": [2.5131685733795166, 4.051571846008301],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_10.jpg"
        }, {
            "embedding": [8.602778434753418, 1.5924264192581177],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_21.jpg"
        }, {
            "embedding": [4.536508560180664, 3.8516697883605957],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_78.jpg"
        }, {
            "embedding": [2.0488405227661133, 3.9816737174987793],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_59.jpg"
        }, {
            "embedding": [9.95512580871582, 2.3622195720672607],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_4.jpg"
        }, {
            "embedding": [11.706748008728027, 1.0989917516708374],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_38.jpg"
        }, {
            "embedding": [9.495089530944824, 2.5579161643981934],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_41.jpg"
        }, {
            "embedding": [8.617380142211914, 1.5555756092071533],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_7.jpg"
        }, {
            "embedding": [9.47152042388916, 0.8520044684410095],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_69.jpg"
        }, {
            "embedding": [12.660745620727539, 1.6014248132705688],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_48.jpg"
        }, {
            "embedding": [4.369267463684082, 4.054813385009766],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_60.jpg"
        }, {
            "embedding": [10.658889770507812, 1.1806015968322754],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_63.png"
        }, {
            "embedding": [9.067926406860352, 2.2026877403259277],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_13.jpg"
        }, {
            "embedding": [7.317829608917236, 3.612607479095459],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_95.jpg"
        }, {
            "embedding": [9.245340347290039, 1.6462689638137817],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_86.jpg"
        }, {
            "embedding": [10.957691192626953, 0.7457164525985718],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_23.jpg"
        }, {
            "embedding": [10.48779582977295, 1.4622488021850586],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_8.jpg"
        }, {
            "embedding": [4.308269023895264, 3.6985116004943848],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_22.jpg"
        }, {
            "embedding": [10.783452033996582, 1.4405094385147095],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_79.jpg"
        }, {
            "embedding": [9.401422500610352, 2.6111903190612793],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_17.jpg"
        }, {
            "embedding": [10.229205131530762, 0.730800986289978],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_77.jpg"
        }, {
            "embedding": [11.030750274658203, 0.830531120300293],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_25.jpg"
        }, {
            "embedding": [13.13982105255127, 1.002453088760376],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_46.jpg"
        }, {
            "embedding": [4.126423358917236, 4.132812023162842],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_9.jpg"
        }, {
            "embedding": [11.30840015411377, 0.9287462830543518],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_34.jpg"
        }, {
            "embedding": [4.501521587371826, 3.637493848800659],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_81.jpg"
        }, {
            "embedding": [11.797063827514648, 0.8788406848907471],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_52.jpeg"
        }, {
            "embedding": [11.05940055847168, 1.1007150411605835],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_6.jpg"
        }, {
            "embedding": [11.222894668579102, 0.8315380215644836],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_20.jpg"
        }, {
            "embedding": [3.4766244888305664, 3.96921968460083],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_98.jpg"
        }, {
            "embedding": [11.680642127990723, 0.5965763330459595],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_47.jpg"
        }, {
            "embedding": [8.194973945617676, 3.089162826538086],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_19.jpg"
        }, {
            "embedding": [4.524821758270264, 4.179764270782471],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_88.jpg"
        }, {
            "embedding": [9.952390670776367, 2.0784499645233154],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_29.jpg"
        }, {
            "embedding": [9.405108451843262, 2.0751073360443115],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_61.jpg"
        }, {
            "embedding": [11.382563591003418, 0.6200551986694336],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_84.jpg"
        }, {
            "embedding": [10.439266204833984, 1.4756059646606445],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_85.jpg"
        }, {
            "embedding": [11.156221389770508, 1.3487800359725952],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_74.jpg"
        }, {
            "embedding": [4.235077857971191, 3.931684970855713],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_53.jpg"
        }, {
            "embedding": [11.818931579589844, 0.8572105765342712],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_92.jpg"
        }, {
            "embedding": [10.870521545410156, 1.3882824182510376],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_27.jpg"
        }, {
            "embedding": [9.706475257873535, 0.8449066877365112],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_55.jpg"
        }, {
            "embedding": [6.8531999588012695, 3.3158652782440186],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_44.jpg"
        }, {
            "embedding": [9.360316276550293, 2.823328733444214],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_72.jpg"
        }, {
            "embedding": [8.575196266174316, 1.8037396669387817],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_73.jpg"
        }, {
            "embedding": [11.259232521057129, 0.7427656650543213],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_96.jpg"
        }, {
            "embedding": [10.806649208068848, 1.4110684394836426],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_83.jpg"
        }, {
            "embedding": [1.8505632877349854, 4.053819179534912],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_11.jpg"
        }, {
            "embedding": [7.682065486907959, 3.3447887897491455],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_82.jpg"
        }, {
            "embedding": [10.661881446838379, 1.3200618028640747],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_50.jpg"
        }, {
            "embedding": [10.161158561706543, 1.7839055061340332],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_58.jpg"
        }, {
            "embedding": [10.71053695678711, 2.0095083713531494],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_97.jpg"
        }, {
            "embedding": [11.81902027130127, 0.6991066336631775],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_68.png"
        }, {
            "embedding": [5.831135272979736, 3.884169340133667],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_62.jpg"
        }, {
            "embedding": [9.90754222869873, 2.0889699459075928],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_30.jpg"
        }, {
            "embedding": [11.440923690795898, 1.0181416273117065],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_5.jpg"
        }, {
            "embedding": [10.563529968261719, 1.6462841033935547],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_100.jpg"
        }, {
            "embedding": [10.987154006958008, 1.1550190448760986],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_67.png"
        }, {
            "embedding": [11.105072975158691, 0.9466817378997803],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_15.jpg"
        }, {
            "embedding": [2.606957197189331, 4.169633865356445],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_35.jpg"
        }, {
            "embedding": [11.097838401794434, 1.1468812227249146],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_14.jpg"
        }, {
            "embedding": [3.2874562740325928, 4.376864433288574],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_39.jpg"
        }, {
            "embedding": [10.214197158813477, 1.2121411561965942],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_76.jpg"
        }, {
            "embedding": [4.228367805480957, 4.370386600494385],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_75.jpg"
        }, {
            "embedding": [9.315135955810547, 1.5726484060287476],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_24.jpg"
        }, {
            "embedding": [11.333067893981934, 0.8403715491294861],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_99.jpg"
        }, {
            "embedding": [10.41641902923584, 1.478197693824768],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_32.jpg"
        }, {
            "embedding": [6.329779624938965, 3.407155990600586],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_80.png"
        }, {
            "embedding": [9.749155044555664, 0.8493620157241821],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_37.jpg"
        }, {
            "embedding": [4.319767951965332, 3.6959733963012695],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_51.jpg"
        }, {
            "embedding": [1.6337448358535767, 4.063877105712891],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_28.jpg"
        }, {
            "embedding": [3.737035036087036, 4.144479274749756],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_54.jpg"
        }, {
            "embedding": [10.751287460327148, 1.5102434158325195],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_93.jpg"
        }, {
            "embedding": [11.068504333496094, 0.7603060007095337],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_36.jpg"
        }, {
            "embedding": [10.689860343933105, 1.1800681352615356],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_42.jpg"
        }, {
            "embedding": [11.054150581359863, 1.0227954387664795],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_31.jpg"
        }, {
            "embedding": [11.533967971801758, 0.7530139684677124],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_49.png"
        }, {
            "embedding": [10.77237319946289, 1.3715921640396118],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_2.jpg"
        }, {
            "embedding": [11.732447624206543, 0.9011932611465454],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_3.jpg"
        }, {
            "embedding": [8.767520904541016, 3.6940009593963623],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_26.jpg"
        }, {
            "embedding": [13.127497673034668, 1.0022236108779907],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_66.jpg"
        }, {
            "embedding": [11.534506797790527, 0.6430356502532959],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_43.jpg"
        }, {
            "embedding": [10.967267990112305, 1.1106075048446655],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/spinach/Image_18.jpg"
        }, {
            "embedding": [2.285316228866577, 4.18457555770874],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/onion/Image_89.jpg"
        }, {
            "embedding": [10.544183731079102, 1.6027894020080566],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/onion/Image_65.jpg"
        }, {
            "embedding": [4.083516597747803, 3.970707893371582],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/onion/Image_1.jpg"
        }, {
            "embedding": [11.233101844787598, 1.0228416919708252],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/onion/Image_71.png"
        }, {
            "embedding": [3.6555914878845215, 3.9219484329223633],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/onion/Image_16.jpg"
        }, {
            "embedding": [5.1026611328125, 4.211329936981201],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/onion/Image_12.jpg"
        }, {
            "embedding": [12.718352317810059, 1.0809615850448608],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/onion/Image_56.jpg"
        }, {
            "embedding": [4.488935947418213, 3.6618785858154297],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/onion/Image_45.jpg"
        }, {
            "embedding": [11.065751075744629, 0.8899566531181335],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/onion/Image_40.jpg"
        }, {
            "embedding": [10.158426284790039, 0.41767099499702454],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/onion/Image_10.jpg"
        }, {
            "embedding": [7.42500638961792, 3.214456796646118],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/onion/Image_21.jpg"
        }, {
            "embedding": [8.871849060058594, 3.5800516605377197],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/onion/Image_59.jpg"
        }, {
            "embedding": [9.892984390258789, 1.3842949867248535],
            "label": 30,
            "category": "corn",
            "sprite_path": "static/dump/umap/static/train/onion/Image_4.jpg"
        }, {
            "embedding": [12.831303596496582, 0.7178974151611328],
            "label": 20,
            "category": "soy beans",
            "sprite_path": "static/dump/umap/static/train/onion/Image_38.jpg"
        }, {
            "embedding": [12.836627960205078, 0.6488397717475891],
            "label": 20,
            "category": "soy beans",
            "sprite_path": "static/dump/umap/static/train/onion/Image_41.jpg"
        }, {
            "embedding": [2.002925157546997, 5.603531837463379],
            "label": 20,
            "category": "soy beans",
            "sprite_path": "static/dump/umap/static/train/onion/Image_7.jpg"
        }, {
            "embedding": [13.349647521972656, 1.287896752357483],
            "label": 20,
            "category": "soy beans",
            "sprite_path": "static/dump/umap/static/train/onion/Image_69.jpg"
        }, {
            "embedding": [1.3819156885147095, 4.44966983795166],
            "label": 20,
            "category": "soy beans",
            "sprite_path": "static/dump/umap/static/train/onion/Image_48.jpg"
        }, {
            "embedding": [2.10323166847229, 5.341975688934326],
            "label": 20,
            "category": "soy beans",
            "sprite_path": "static/dump/umap/static/train/onion/Image_60.jpg"
        }, {
            "embedding": [2.8384265899658203, 4.136240482330322],
            "label": 20,
            "category": "soy beans",
            "sprite_path": "static/dump/umap/static/train/onion/Image_63.png"
        }, {
            "embedding": [12.809090614318848, 0.6724066138267517],
            "label": 20,
            "category": "soy beans",
            "sprite_path": "static/dump/umap/static/train/onion/Image_35.png"
        }, {
            "embedding": [12.690926551818848, 0.7211669087409973],
            "label": 20,
            "category": "soy beans",
            "sprite_path": "static/dump/umap/static/train/onion/Image_13.jpg"
        }, {
            "embedding": [2.704746723175049, 4.037341117858887],
            "label": 20,
            "category": "soy beans",
            "sprite_path": "static/dump/umap/static/train/onion/Image_91.jpg"
        }, {
            "embedding": [1.7882736921310425, 5.598311901092529],
            "label": 20,
            "category": "soy beans",
            "sprite_path": "static/dump/umap/static/train/onion/Image_95.jpg"
        }, {
            "embedding": [8.708537101745605, 2.4616358280181885],
            "label": 20,
            "category": "soy beans",
            "sprite_path": "static/dump/umap/static/train/onion/Image_86.jpg"
        }, {
            "embedding": [8.65247917175293, 2.202554941177368],
            "label": 20,
            "category": "soy beans",
            "sprite_path": "static/dump/umap/static/train/onion/Image_23.jpg"
        }, {
            "embedding": [6.964670658111572, 2.6254022121429443],
            "label": 20,
            "category": "soy beans",
            "sprite_path": "static/dump/umap/static/train/onion/Image_8.jpg"
        }, {
            "embedding": [8.397083282470703, 0.6521123051643372],
            "label": 20,
            "category": "soy beans",
            "sprite_path": "static/dump/umap/static/train/onion/Image_22.jpg"
        },
    ]

};

export const useEmbeddingsData = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = MOCK_API_DATA;

        const scaledPoints = data.items.map((item: EmbeddingItem, index: number) => ({
          id: index,
          x: item.embedding[0] * (800 / 15),
          y: item.embedding[1] * (600 / 15),
          category: item.category,
          spritePath: item.sprite_path,
          originalItem: item
        }));

        setPoints(scaledPoints);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { points, isLoading, error };
};