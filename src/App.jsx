import { useState } from "react";

const C = {
  sageDark:"#5A6E58",sageLight:"#C8D8CC",cream:"#F5F0E8",
  forest:"#2E3832",accent:"#8FA68C",right:"#6A9B7A",wrong:"#C17A6F",gold:"#B8A060",
};

const ACCESS_CODE = "mymovementlab2025";
const FREE_LIMIT = 10;

const HISTORY = [
  {id:"h1",type:"mcq",level:"Beginner",topic:"Joseph Pilates",q:"Where was Joseph Pilates born?",options:["Near London, England","Near Düsseldorf, Germany","Near New York, USA","Near Vienna, Austria"],correct:1,explanation:"Joseph Pilates was born near Düsseldorf, Germany in 1883."},
  {id:"h2",type:"mcq",level:"Intermediate",topic:"Joseph Pilates",q:"What childhood conditions drove Joseph Pilates to pursue physical fitness?",options:["Scoliosis and flat feet","Heart disease and weak lungs","Rickets, asthma, and rheumatic fever","Poor coordination and vision problems"],correct:2,explanation:"Joseph Pilates was a sickly child, plagued with rickets, asthma, and rheumatic fever."},
  {id:"h3",type:"mcq",level:"Beginner",topic:"Joseph Pilates",q:"In what year did Joseph and Clara open their first studio in New York?",options:["1912","1918","1926","1934"],correct:2,explanation:"Joseph and Clara Pilates set up their first studio in New York City in 1926."},
  {id:"h4",type:"tf",level:"Beginner",topic:"Joseph Pilates",q:"Joseph Pilates called his method 'Contrology'.",correct:true,explanation:"Joseph Pilates called his method Contrology — a way of life and a path to total health."},
  {id:"h5",type:"tf",level:"Beginner",topic:"Joseph Pilates",q:"Joseph Pilates left extensive written materials to guide future generations of teachers.",correct:false,explanation:"Joseph Pilates did NOT leave extensive written materials. He wrote only two short books."},
  {id:"h6",type:"mcq",level:"Intermediate",topic:"Joseph Pilates",q:"While interned on the Isle of Man during WWI, what did Joseph Pilates begin?",options:["Writing his first book","Devising apparatus to aid rehabilitation of the disabled and sick","Training the German army","Teaching classical ballet"],correct:1,explanation:"While interned on the Isle of Man, Pilates began devising apparatus to aid rehabilitation."},
  {id:"h7",type:"mcq",level:"Intermediate",topic:"Joseph Pilates",q:"Why did Joseph Pilates leave Germany after WWI?",options:["He wanted a studio in Near London","He recognised the implications of training the new German Army and chose to leave for America","Clara insisted they move","He had a contract in New York"],correct:1,explanation:"Recognising the implications of training the new German Army, he chose to leave for America."},
  {id:"h8",type:"mcq",level:"Intermediate",topic:"Joseph Pilates",q:"Which community particularly recognised the value of Pilates' work early on?",options:["The medical community","The military","The dance community","Olympic athletes"],correct:2,explanation:"The dance community — including George Balanchine, Ted Shawn, and Martha Graham — truly recognised the value of this work."},
  {id:"h9",type:"mcq",level:"Advanced",topic:"Joseph Pilates",q:"Approximately how many exercises did Joseph Pilates develop across all apparatus?",options:["Over 100","Over 300","Over 600","Over 1000"],correct:2,explanation:"Over his career, Joseph Pilates developed over 600 exercises for the various pieces of apparatus he invented."},
  {id:"h10",type:"tf",level:"Intermediate",topic:"Joseph Pilates",q:"Joseph Pilates met Clara on his journey to the United States.",correct:true,explanation:"Joseph met Clara on his way over to the United States."},
  {id:"h11",type:"fill",level:"Beginner",topic:"Joseph Pilates",q:"Joseph Pilates called his method ___.",answer:"Contrology",hint:"The name he gave his system",explanation:"Joseph Pilates called his method Contrology."},
  {id:"h12",type:"fill",level:"Beginner",topic:"Joseph Pilates",q:"Joseph Pilates was born near ___, Germany.",answer:"Düsseldorf",hint:"A city in western Germany",explanation:"Joseph Pilates was born near Düsseldorf, Germany in 1883."},
  {id:"h13",type:"fill",level:"Intermediate",topic:"Joseph Pilates",q:"Joseph and Clara Pilates opened their first studio in New York City in ___.",answer:"1926",hint:"Mid-1920s",explanation:"The first Pilates studio opened in New York City in 1926."},
  {id:"h14",type:"fill",level:"Advanced",topic:"Joseph Pilates",q:"Joseph Pilates developed over ___ exercises across all apparatus.",answer:"600",hint:"A large number",explanation:"Over his career, Joseph Pilates developed over 600 exercises."},
  {id:"h15",type:"flashcard",level:"Beginner",topic:"Joseph Pilates",q:"Who was Joseph Pilates and what was his method?",answer:"Born near Düsseldorf, Germany in 1883. A sickly child who overcame rickets, asthma, and rheumatic fever. He called his method Contrology and regarded it as a way of life — a path to total health, not merely a series of exercises.",explanation:"Joseph Pilates studied both Eastern and Western forms of exercise and philosophy."},
  {id:"h16",type:"flashcard",level:"Intermediate",topic:"Joseph Pilates",q:"What happened to Joseph Pilates during WWI and how did he end up in New York?",answer:"Interned on the Isle of Man, he began devising rehabilitation apparatus. After the war, invited to train the German Army, he chose to leave for America. He met Clara on the journey. In 1926 they opened their first studio in New York City.",explanation:"The dance community were among the first to truly embrace the work."},
  {id:"h17",type:"sequence",level:"Intermediate",topic:"Joseph Pilates",q:"Put these events in Joseph Pilates' life in the correct chronological order:",items:["Opens first studio in New York with Clara","Born near Düsseldorf, Germany","Travels to England","Interned on the Isle of Man during WWI","Invited to train German Army — leaves for America"],correct:[1,2,3,4,0],explanation:"Born 1883 → England 1912 → Isle of Man WWI → Leaves for America → New York studio 1926."},
  {id:"h18",type:"error",level:"Intermediate",topic:"Joseph Pilates",q:"A student says: 'Joseph Pilates opened his first studio in Near London in 1918 after WWI.' What is wrong?",answer:"Two errors: the studio was in New York City (not Near London), and it opened in 1926 (not 1918).",explanation:"The first Pilates studio opened in New York City in 1926."},
  {id:"h19",type:"error",level:"Advanced",topic:"Joseph Pilates",q:"A student says: 'Joseph Pilates accepted the invitation to train the German Army and later moved to New York.' What is wrong?",answer:"Joseph Pilates did NOT accept — he recognised the implications and chose to leave for America instead.",explanation:"Recognising the implications, Pilates left for America rather than accepting the invitation."},
  {id:"h20",type:"mcq",level:"Advanced",topic:"Joseph Pilates",q:"Which dance luminaries are mentioned as early champions of Pilates?",options:["Rudolf Nureyev and Margot Fonteyn","Isadora Duncan and Alvin Ailey","George Balanchine, Ted Shawn, and Martha Graham","Fred Astaire and Gene Kelly"],correct:2,explanation:"George Balanchine, Ted Shawn, and Martha Graham truly recognised the value of this work."},
  {id:"h21",type:"mcq",level:"Beginner",topic:"The 10 Principles",q:"How many principles are recognised in the Pilates method?",options:["6","8","10","12"],correct:2,explanation:"The Pilates method recognises 10 principles: Awareness, Balance, Breath, Center, Concentration, Control, Efficiency, Flow, Harmony, and Precision. Note: some classical approaches cite 6 — this program works with the full set of 10."},
  {id:"h22",type:"mcq",level:"Beginner",topic:"The 10 Principles",q:"Which of these is NOT one of the 10 principles of Pilates?",options:["Efficiency","Harmony","Flexibility","Awareness"],correct:2,explanation:"Flexibility is not one of the 10 principles — though it is a benefit of practice."},
  {id:"h23",type:"tf",level:"Beginner",topic:"The 10 Principles",q:"Flow as a Pilates principle describes smooth, uninterrupted continuity of movement.",correct:true,explanation:"Flow is smooth, uninterrupted continuity of movement requiring precise muscle activation and timing."},
  {id:"h24",type:"tf",level:"Intermediate",topic:"The 10 Principles",q:"Control means performing every exercise as slowly as possible.",correct:false,explanation:"Control means every action is guided by deliberate muscular effort — not that movements must be slow."},
  {id:"h25",type:"tf",level:"Intermediate",topic:"The 10 Principles",q:"Flexibility is one of the 10 principles of Pilates.",correct:false,explanation:"Flexibility is a benefit of Pilates practice, not one of the 10 principles."},
  {id:"h26",type:"mcq",level:"Intermediate",topic:"The 10 Principles",q:"What does the principle of Precision mean?",options:["Moving as quickly as possible","The exact manner in which an action is executed","Holding positions for 8 counts","Breathing in a set pattern"],correct:1,explanation:"Precision is the exact manner in which an action is executed."},
  {id:"h27",type:"mcq",level:"Intermediate",topic:"The 10 Principles",q:"What does the principle of Center refer to?",options:["The geographical centre of the studio","The core of the body — the powerhouse — from which all movement emanates","Standing in the middle of the mat","The centre of gravity only"],correct:1,explanation:"Center refers to the core of the body — the powerhouse — the spring from which all movement emanates."},
  {id:"h28",type:"mcq",level:"Intermediate",topic:"The 10 Principles",q:"What does Concentration mean as a Pilates principle?",options:["Counting repetitions carefully","Direction of full mental attention to mastering the exercise","Focusing only on the breath","Memorising the sequence"],correct:1,explanation:"Concentration means directing full mental attention to the mastery of a given exercise."},
  {id:"h29",type:"mcq",level:"Intermediate",topic:"The 10 Principles",q:"What does Efficiency mean as a Pilates principle?",options:["Completing exercises as fast as possible","Achieving maximum results with minimum effort — no excess tension","Using minimal equipment","Shortening class duration"],correct:1,explanation:"Efficiency describes achieving maximum results with minimum effort and no excess tension."},
  {id:"h30",type:"mcq",level:"Advanced",topic:"The 10 Principles",q:"What does Harmony describe as a principle?",options:["Matching music to movement","The integrated mind-body connection — all principles working together fluidly","Exercising with a partner","Symmetrical development of the body only"],correct:1,explanation:"Harmony describes the integrated mind-body connection — all principles working together fluidly."},
  {id:"h31",type:"fill",level:"Beginner",topic:"The 10 Principles",q:"The principle of ___ describes smooth, uninterrupted continuity of movement.",answer:"Flow",hint:"One of the 10 principles",explanation:"Flow is smooth, uninterrupted continuity of movement."},
  {id:"h32",type:"fill",level:"Beginner",topic:"The 10 Principles",q:"The principle of ___ refers to the exact manner in which an action is executed.",answer:"Precision",hint:"One of the 10 principles",explanation:"Precision is the exact manner in which an action is executed."},
  {id:"h33",type:"fill",level:"Intermediate",topic:"The 10 Principles",q:"The 10 principles are: Awareness, Balance, Breath, ___, Concentration, Control, Efficiency, Flow, Harmony, and Precision.",answer:"Center",hint:"The core of the body",explanation:"Center is the 4th principle."},
  {id:"h34",type:"fill",level:"Advanced",topic:"The 10 Principles",q:"The principle of ___ means achieving maximum results with minimum effort.",answer:"Efficiency",hint:"Doing more with less",explanation:"Efficiency describes achieving maximum results with minimum effort."},
  {id:"h35",type:"flashcard",level:"Beginner",topic:"The 10 Principles",q:"Name all 10 principles of the Pilates method.",answer:"Awareness, Balance, Breath, Center, Concentration, Control, Efficiency, Flow, Harmony, Precision.",explanation:"These 10 principles are the foundation of the Pilates method."},
  {id:"h36",type:"flashcard",level:"Intermediate",topic:"The 10 Principles",q:"What is the difference between Precision and Control?",answer:"Control means every action is guided by deliberate muscular effort — no movement is haphazard. Precision is the exact manner in which that action is executed.",explanation:"Both principles work together: Control provides the intention, Precision provides the quality."},
  {id:"h37",type:"error",level:"Intermediate",topic:"The 10 Principles",q:"A student says: 'Control means I should always move slowly and hold each position.' What is wrong?",answer:"Control means every action is guided by deliberate muscular effort — not that movements must be slow.",explanation:"Control is about intentional muscular engagement, not speed."},
  {id:"h38",type:"error",level:"Advanced",topic:"The 10 Principles",q:"A teacher says: 'Today we'll focus only on Precision and ignore the other principles.' What is wrong?",answer:"At any one time certain principles may be stressed more than others, but none should be ignored.",explanation:"The principles work together — none can be completely absent."},
  {id:"h39",type:"cue_selection",level:"Intermediate",topic:"The 10 Principles",q:"A student is rushing through exercises and losing quality. Which principle should you address first?",options:["Precision — the exact manner of execution is being compromised","Flow — they are moving too slowly","Efficiency — they are using too much energy","Balance — they are uneven"],correct:0,explanation:"When quality of execution is lost, Precision is the principle to address."},
  {id:"h40",type:"scenario",level:"Advanced",topic:"The 10 Principles",q:"A student tells you: 'I don't understand why we need to think so much — can't I just do the exercises?' How do you respond using the principles?",answer:"Pilates is a mind-body practice. The 10 principles require mental engagement alongside physical effort. Without Concentration and Awareness, the full benefit cannot be achieved.",explanation:"The principles make Pilates a mind-body form of conditioning."},
  {id:"h41",type:"mcq",level:"Beginner",topic:"Pelvis & Neutral Spine",q:"What is neutral pelvis?",options:["A completely flat lower back","The position where the ASIS and the pubic symphysis are in the same horizontal plane","Maximum posterior pelvic tilt","Full anterior pelvic tilt"],correct:1,explanation:"Neutral pelvis: the ASIS on each side and the pubic symphysis (PS) are in the same horizontal plane when lying supine."},
  {id:"h42",type:"mcq",level:"Intermediate",topic:"Pelvis & Neutral Spine",q:"If the pubic symphysis is HIGHER than the ASIS when lying supine, what does this indicate?",options:["Neutral pelvis","Anterior pelvic tilt (arch)","Posterior pelvic tilt (tuck)","Scoliosis"],correct:2,explanation:"If the pubic symphysis is higher than the ASIS → posterior pelvic tilt (tuck)."},
  {id:"h43",type:"mcq",level:"Intermediate",topic:"Pelvis & Neutral Spine",q:"If the ASIS are HIGHER than the pubic symphysis when lying supine, what does this indicate?",options:["Neutral pelvis","Anterior pelvic tilt (arch)","Posterior pelvic tilt (tuck)","Lateral pelvic shift"],correct:1,explanation:"If the ASIS are higher than the PS → anterior pelvic tilt (arch)."},
  {id:"h44",type:"tf",level:"Intermediate",topic:"Pelvis & Neutral Spine",q:"When the spine is in neutral, the pelvis must also be in neutral.",correct:true,explanation:"When the spine is in neutral, the pelvis must be in neutral too."},
  {id:"h45",type:"tf",level:"Intermediate",topic:"Pelvis & Neutral Spine",q:"Neutral spine means the spine is completely flat with no curves.",correct:false,explanation:"Neutral spine means the natural curves of the spine are present — not that the spine is flat."},
  {id:"h46",type:"mcq",level:"Advanced",topic:"Pelvis & Neutral Spine",q:"Which two muscles are most important for stabilisation and prevention of back pain?",options:["Rectus abdominis and erector spinae","Transversus abdominis (TA) and multifidus","External obliques and gluteus maximus","Iliopsoas and quadratus lumborum"],correct:1,explanation:"Research has singled out the transversus abdominis (TA) and multifidus as most important for stabilisation and prevention of back pain."},
  {id:"h47",type:"mcq",level:"Intermediate",topic:"Pelvis & Neutral Spine",q:"What is the most important abdominal muscle for stabilisation?",options:["Rectus abdominis","External obliques","Transversus abdominis (TA)","Internal obliques"],correct:2,explanation:"The transversus abdominis (TA) is the most important for stabilisation."},
  {id:"h48",type:"mcq",level:"Intermediate",topic:"Pelvis & Neutral Spine",q:"What is the pelvis described as in terms of body structure?",options:["The anchor of the spine","A bridge between the upper and lower body","A fixed bony structure","The primary weight-bearing joint only"],correct:1,explanation:"The pelvis serves as a bridge between the upper and lower body."},
  {id:"h49",type:"mcq",level:"Advanced",topic:"Pelvis & Neutral Spine",q:"To correct an anterior pelvic tilt, which muscles need to be strengthened?",options:["Spinal extensors and hip flexors","Abdominals and hamstrings","Adductors and quadriceps","Gluteus medius and tibialis anterior"],correct:1,explanation:"The muscles that correct anterior tilt by moving the pelvis posteriorly are the abdominals and hamstrings."},
  {id:"h50",type:"mcq",level:"Intermediate",topic:"Pelvis & Neutral Spine",q:"What does imprinting describe in Pilates teaching?",options:["Pressing the spine firmly into the mat at all times","Using the image of the body making an imprint in the ground to encourage fluid sequential movement","Memorising the exercise sequence","Marking the mat to track position"],correct:1,explanation:"Imprinting uses the image of body parts making an imprint into the ground — encouraging sequential articulation without excess tension."},
  {id:"h51",type:"fill",level:"Beginner",topic:"Pelvis & Neutral Spine",q:"Neutral pelvis refers to the position where the ___ and the pubic symphysis are in the same horizontal plane.",answer:"ASIS",hint:"Anterior superior iliac spine",explanation:"The ASIS and PS are the key landmarks for identifying neutral pelvis."},
  {id:"h52",type:"fill",level:"Advanced",topic:"Pelvis & Neutral Spine",q:"The two muscles most important for stabilisation are the ___ and the ___.",answer:"transversus abdominis / multifidus",hint:"One is the deepest abdominal muscle",explanation:"The TA and multifidus have the most profound effect on stabilisation and prevention of back pain."},
  {id:"h53",type:"fill",level:"Intermediate",topic:"Pelvis & Neutral Spine",q:"The pelvis serves as a ___ between the upper and lower body.",answer:"bridge",hint:"A structure connecting two sides",explanation:"The pelvis serves as a bridge between the upper and lower body."},
  {id:"h54",type:"error",level:"Intermediate",topic:"Pelvis & Neutral Spine",q:"A student says: 'My spine is in neutral — it's completely flat against the mat.' What is wrong?",answer:"Neutral spine means the natural curves of the spine are present — not that the spine is flat. A completely flat spine indicates an imprinted or posteriorly tilted pelvis.",explanation:"Neutral spine preserves the natural curves."},
  {id:"h55",type:"scenario",level:"Advanced",topic:"Pelvis & Neutral Spine",q:"A student has an anterior pelvic tilt. Which muscle groups do you prioritise and why?",answer:"Strengthen the abdominals and hamstrings (they move the pelvis posteriorly). Stretch the hip flexors and lower back extensors if tight. Cue neutral pelvis and adequate pelvic-lumbar stabilisation throughout.",explanation:"Both sides of the imbalance must be addressed."},
  {id:"h56",type:"flashcard",level:"Beginner",topic:"Pelvis & Neutral Spine",q:"How do you identify neutral pelvis when lying supine?",answer:"The ASIS on each side and the pubic symphysis should be in the same horizontal plane. PS higher than ASIS → posterior tilt. ASIS higher than PS → anterior tilt.",explanation:"This is the reference position from which all pelvic movement is assessed."},
  {id:"h57",type:"mcq",level:"Beginner",topic:"Breathing",q:"What is lateral breathing also called?",options:["Diaphragmatic breathing","Intercostal breathing","Paradoxical breathing","Belly breathing"],correct:1,explanation:"Lateral breathing is also called intercostal breathing. It emphasises the lateral expansion of the rib cage."},
  {id:"h58",type:"mcq",level:"Intermediate",topic:"Breathing",q:"Why is lateral breathing preferred during many Pilates exercises?",options:["It increases lung capacity","It facilitates and maintains abdominal contraction, especially during inhalation","It slows the heart rate","It expands the chest upward"],correct:1,explanation:"Lateral breathing maintains abdominal contraction — particularly during inhalation, since normal diaphragmatic breathing demands relaxation of the abdominals on the inhale."},
  {id:"h59",type:"mcq",level:"Intermediate",topic:"Breathing",q:"What happens to the diaphragm during inhalation?",options:["It rises upward into a dome shape","It contracts and flattens, lowering to enlarge the thoracic cavity","It relaxes completely","It moves sideways only"],correct:1,explanation:"During inhalation, the diaphragm contracts and flattens, lowering and enlarging the thoracic cavity."},
  {id:"h60",type:"mcq",level:"Advanced",topic:"Breathing",q:"During normal diaphragmatic breathing, approximately what percentage of respiratory effort is the diaphragm responsible for?",options:["25%","50%","75%","90%"],correct:2,explanation:"The diaphragm is responsible for approximately 75% of the respiratory effort."},
  {id:"h61",type:"tf",level:"Beginner",topic:"Breathing",q:"Breathing in Pilates can help recruit the appropriate muscles for movements.",correct:true,explanation:"Breath oxygenates the blood, calms the mind, recruits appropriate muscles, and provides an inner rhythm."},
  {id:"h62",type:"tf",level:"Intermediate",topic:"Breathing",q:"Normal diaphragmatic breathing requires the abdominals to relax during inhalation.",correct:true,explanation:"Diaphragmatic breathing demands relaxation of the abdominals during inhalation — which is why lateral breathing is preferred in Pilates."},
  {id:"h63",type:"tf",level:"Advanced",topic:"Breathing",q:"Practicing set breathing patterns always has a positive transfer to functional movement.",correct:false,explanation:"This is controversial. EMG studies show that TA recruitment occurs in functional movement without any attempt to shape breathing."},
  {id:"h64",type:"tf",level:"Beginner",topic:"Breathing",q:"It is always better to force a specific breathing pattern than to breathe naturally if a student finds the pattern confusing.",correct:false,explanation:"It is preferable to use an alternate pattern or no pattern at all than to cause tension."},
  {id:"h65",type:"fill",level:"Beginner",topic:"Breathing",q:"Lateral breathing is also called ___ breathing.",answer:"intercostal",hint:"Between the ribs",explanation:"Lateral/intercostal breathing emphasises the lateral expansion of the rib cage."},
  {id:"h66",type:"fill",level:"Intermediate",topic:"Breathing",q:"During inhalation, the diaphragm ___ and flattens, enlarging the thoracic cavity.",answer:"contracts",hint:"What muscles do when they activate",explanation:"The diaphragm contracts and flattens during inhalation."},
  {id:"h67",type:"fill",level:"Intermediate",topic:"Breathing",q:"In regular diaphragmatic breathing, the diaphragm is responsible for approximately ___% of the respiratory effort.",answer:"75",hint:"Three quarters",explanation:"The diaphragm is responsible for approximately 75% of the respiratory effort."},
  {id:"h68",type:"fill",level:"Beginner",topic:"Breathing",q:"The cue 'navel to ___' refers to engaging the transversus abdominis.",answer:"spine",hint:"What the navel moves toward",explanation:"'Navel to spine' refers to engaging the TA to compress and draw in the abdominal cavity."},
  {id:"h69",type:"flashcard",level:"Beginner",topic:"Breathing",q:"What is lateral breathing and why is it used in Pilates?",answer:"Lateral breathing (intercostal breathing) emphasises the lateral expansion of the rib cage. It maintains abdominal contraction during exercises — particularly during inhalation, since normal diaphragmatic breathing requires the abdominals to relax on the inhale.",explanation:"This allows the core to remain engaged throughout the breath cycle."},
  {id:"h70",type:"error",level:"Intermediate",topic:"Breathing",q:"A student says: 'I always breathe into my belly during Pilates to engage my core.' What is wrong?",answer:"Belly breathing requires the abdominals to RELAX during inhalation — this can compromise core stability. Lateral/intercostal breathing is preferred precisely to maintain abdominal engagement during inhalation.",explanation:"The goal is to expand the ribcage laterally, not push the belly out."},
  {id:"h71",type:"cue_selection",level:"Intermediate",topic:"Breathing",q:"A student is holding their breath during the effort phase of an abdominal exercise. Which cue do you use?",options:["'Exhale as you curl up — let the breath support your abdominals.'","'Hold your breath to stabilise your core.'","'Breathe into your belly to relax.'","'Inhale as you lift — fill the lungs fully.'"],correct:0,explanation:"Exhaling during the effort phase supports core engagement."},
  {id:"h72",type:"scenario",level:"Advanced",topic:"Breathing",q:"A student becomes tense and confused trying to follow the breathing pattern during a complex exercise. What do you do?",answer:"Release the breathing instruction temporarily. It is preferable to use an alternate pattern or no pattern at all than to cause tension. Once the student has mastered the movement, reintroduce the breath progressively.",explanation:"Breathing should not become counterproductive by creating tension and confusion."},
];

const ANATOMY = [
  {id:"a1",type:"mcq",level:"Beginner",topic:"Planes & Directions",q:"Which plane divides the body into right and left portions?",options:["Coronal/Frontal plane","Transverse plane","Sagittal plane","Median plane"],correct:2,explanation:"The sagittal plane divides the body into right and left portions."},
  {id:"a2",type:"mcq",level:"Beginner",topic:"Planes & Directions",q:"Which plane divides the body into front and back portions?",options:["Sagittal plane","Transverse plane","Coronal/Frontal plane","Median plane"],correct:2,explanation:"The coronal/frontal plane divides the body into front and back portions."},
  {id:"a3",type:"mcq",level:"Beginner",topic:"Planes & Directions",q:"Which plane divides the body into upper and lower portions?",options:["Sagittal plane","Coronal plane","Transverse plane","Median plane"],correct:2,explanation:"The transverse plane is a horizontal plane dividing the body into upper and lower portions."},
  {id:"a4",type:"mcq",level:"Beginner",topic:"Planes & Directions",q:"What does 'anterior' mean?",options:["Back side / in back of","Closer to the midline","Front side / in front of","Above / towards the head"],correct:2,explanation:"Anterior means front side or in front of. The opposite is posterior."},
  {id:"a5",type:"mcq",level:"Beginner",topic:"Planes & Directions",q:"What does 'superior' mean?",options:["In front of","Closer to the midline","Above / towards the head","Below / towards the feet"],correct:2,explanation:"Superior means above or towards the head. Inferior means below or towards the feet."},
  {id:"a6",type:"mcq",level:"Beginner",topic:"Planes & Directions",q:"What does 'medial' mean?",options:["Further from the midline","Closer toward the median plane / midline","Above, towards the head","In front of"],correct:1,explanation:"Medial means closer toward the median plane or midline. Lateral is the opposite."},
  {id:"a7",type:"mcq",level:"Intermediate",topic:"Planes & Directions",q:"What does 'proximal' mean?",options:["Further from the root of the limb","Closer to the root of the limb or center of the body","Above / towards the head","In front of"],correct:1,explanation:"Proximal means closer to the root of the limb or center of the body. Distal means further."},
  {id:"a8",type:"mcq",level:"Beginner",topic:"Planes & Directions",q:"What does 'supine' mean?",options:["Lying on the front with face downward","Standing upright","Lying on the back with face upward","Kneeling on all fours"],correct:2,explanation:"Supine means lying on the back of the body with the face upward. Prone is the opposite."},
  {id:"a9",type:"mcq",level:"Beginner",topic:"Planes & Directions",q:"What does 'prone' mean?",options:["Lying on the back with face upward","Lying on the front of the body with face downward","Standing upright","Sitting upright"],correct:1,explanation:"Prone means lying on the front of the body with face downward. Supine is the opposite."},
  {id:"a10",type:"tf",level:"Beginner",topic:"Planes & Directions",q:"The sagittal plane divides the body into right and left portions.",correct:true,explanation:"The sagittal plane is a vertical plane dividing the body into right and left portions."},
  {id:"a11",type:"tf",level:"Beginner",topic:"Planes & Directions",q:"The transverse plane divides the body into front and back portions.",correct:false,explanation:"The transverse plane divides the body into UPPER and LOWER portions. The coronal/frontal plane divides front and back."},
  {id:"a12",type:"tf",level:"Beginner",topic:"Planes & Directions",q:"'Prone' means lying on the back with the face upward.",correct:false,explanation:"Prone means lying on the FRONT of the body with face downward. Lying on the back is supine."},
  {id:"a13",type:"tf",level:"Intermediate",topic:"Planes & Directions",q:"'Proximal' means further from the root of the limb.",correct:false,explanation:"Proximal means CLOSER to the root of the limb. Distal means further."},
  {id:"a14",type:"fill",level:"Beginner",topic:"Planes & Directions",q:"Lying on the back with face upward is called ___.",answer:"supine",hint:"The opposite of prone",explanation:"Supine means lying on the back of the body with the face upward."},
  {id:"a15",type:"fill",level:"Beginner",topic:"Planes & Directions",q:"Lying on the front with face downward is called ___.",answer:"prone",hint:"The opposite of supine",explanation:"Prone means lying on the front of the body with face downward."},
  {id:"a16",type:"fill",level:"Beginner",topic:"Planes & Directions",q:"The plane that divides the body into upper and lower portions is the ___ plane.",answer:"transverse",hint:"Horizontal cut",explanation:"The transverse plane divides the body into upper and lower portions."},
  {id:"a17",type:"fill",level:"Beginner",topic:"Planes & Directions",q:"The plane that divides the body into right and left portions is the ___ plane.",answer:"sagittal",hint:"Vertical cut front to back",explanation:"The sagittal plane divides the body into right and left portions."},
  {id:"a18",type:"flashcard",level:"Beginner",topic:"Planes & Directions",q:"What are the 3 body planes and what does each divide?",answer:"Sagittal — right and left. Coronal/Frontal — front and back. Transverse — upper and lower.",explanation:"Understanding planes of motion helps describe and analyse movement precisely."},
  {id:"a19",type:"error",level:"Intermediate",topic:"Planes & Directions",q:"A student says 'The transverse plane divides the body into front and back.' What is wrong?",answer:"The transverse plane divides the body into UPPER and LOWER portions. The coronal/frontal plane divides front and back.",explanation:"Each plane divides the body along a different axis."},
  {id:"a20",type:"error",level:"Beginner",topic:"Planes & Directions",q:"A student says 'Prone means lying on the back with the face upward.' What is wrong?",answer:"Prone means lying on the FRONT of the body with face downward. Lying on the back face upward is SUPINE.",explanation:"Prone = face down, supine = face up."},
  {id:"a21",type:"mcq",level:"Beginner",topic:"Joints",q:"What type of joint is the hip?",options:["Hinge joint","Pivot joint","Ball-and-socket joint","Saddle joint"],correct:2,explanation:"The hip is a ball-and-socket joint — allowing movement in three planes."},
  {id:"a22",type:"mcq",level:"Beginner",topic:"Joints",q:"What type of joint is the knee?",options:["Ball-and-socket joint","Saddle joint","Hinge joint","Pivot joint"],correct:2,explanation:"The knee is a hinge joint — allows forward-backward movement in one plane."},
  {id:"a23",type:"mcq",level:"Beginner",topic:"Joints",q:"What type of joint is a fibrous joint?",options:["Freely movable with synovial fluid","Where bones are directly connected by fibrous tissue — immovable","Where bones are connected by cartilage","A hinge joint"],correct:1,explanation:"A fibrous joint: bones directly connected by fibrous tissue — immovable. Example: sutures of the skull."},
  {id:"a24",type:"mcq",level:"Beginner",topic:"Joints",q:"What type of joint is a cartilaginous joint?",options:["Contains synovial fluid","Bones connected by fibrous tissue","Bones directly connected by cartilage — slightly movable","Freely movable"],correct:2,explanation:"A cartilaginous joint: bones connected by cartilage — slightly movable. Example: intervertebral disc."},
  {id:"a25",type:"mcq",level:"Beginner",topic:"Joints",q:"What type of joint is a synovial joint?",options:["Bones connected by fibrous tissue","Bones connected by cartilage","Has synovial fluid between the bones — freely movable","Immovable"],correct:2,explanation:"A synovial joint has a small space containing synovial fluid — freely movable. Examples: shoulder, hip, knee."},
  {id:"a26",type:"mcq",level:"Intermediate",topic:"Joints",q:"What is an example of a pivot joint?",options:["Hip","Knee","Joints of the forearm — upper and lower radioulnar joints","Wrist"],correct:2,explanation:"A pivot joint: formed between a rounded surface and arch-shaped surface — allows rotation in one plane. Example: radioulnar joints."},
  {id:"a27",type:"mcq",level:"Advanced",topic:"Joints",q:"How many planes of movement does a ball-and-socket joint allow?",options:["One plane","Two planes","Three planes","No fixed planes"],correct:2,explanation:"A ball-and-socket joint allows movement in three planes — the most mobile type of synovial joint."},
  {id:"a28",type:"tf",level:"Beginner",topic:"Joints",q:"The shoulder is an example of a ball-and-socket joint.",correct:true,explanation:"Both the shoulder and hip are ball-and-socket joints — allowing movement in three planes."},
  {id:"a29",type:"tf",level:"Beginner",topic:"Joints",q:"The intervertebral disc is an example of a synovial joint.",correct:false,explanation:"The intervertebral disc is a CARTILAGINOUS joint — not synovial."},
  {id:"a30",type:"tf",level:"Intermediate",topic:"Joints",q:"A hinge joint allows movement in two planes.",correct:false,explanation:"A hinge joint allows forward-backward movement in ONE plane only."},
  {id:"a31",type:"tf",level:"Advanced",topic:"Joints",q:"Joints with greater mobility by nature have less stability.",correct:true,explanation:"Joints with greater mobility have less inherent stability — stability must be created by muscular strength."},
  {id:"a32",type:"fill",level:"Beginner",topic:"Joints",q:"The hip and shoulder are examples of ___ joints.",answer:"ball-and-socket",hint:"The most mobile type",explanation:"Ball-and-socket joints allow movement in three planes."},
  {id:"a33",type:"fill",level:"Beginner",topic:"Joints",q:"The elbow, knee, and ankle are examples of ___ joints.",answer:"hinge",hint:"Like a door hinge",explanation:"Hinge joints allow forward-backward movement in one plane."},
  {id:"a34",type:"fill",level:"Intermediate",topic:"Joints",q:"The intervertebral disc is an example of a ___ joint.",answer:"cartilaginous",hint:"Bones connected by cartilage",explanation:"Cartilaginous joints are slightly movable."},
  {id:"a35",type:"flashcard",level:"Beginner",topic:"Joints",q:"What are the 3 main types of joints and how do they differ?",answer:"Fibrous — immovable, bones connected by fibrous tissue (e.g. skull sutures). Cartilaginous — slightly movable, bones connected by cartilage (e.g. intervertebral disc). Synovial — freely movable, contains synovial fluid (e.g. hip, knee, shoulder).",explanation:"Understanding joint types helps explain the range of motion possible at each joint."},
  {id:"a36",type:"error",level:"Intermediate",topic:"Joints",q:"A student says 'The intervertebral disc is a synovial joint.' What is wrong?",answer:"The intervertebral disc is a CARTILAGINOUS joint — bones connected by cartilage. Synovial joints contain synovial fluid in a space between the bones.",explanation:"The three types of joints are fibrous, cartilaginous, and synovial."},
  {id:"a37",type:"mcq",level:"Beginner",topic:"Joint Movements",q:"What is dorsiflexion?",options:["Pointing the foot downward","Bringing the top of the foot up towards the shin","Rolling the foot inward","Turning the palm forward"],correct:1,explanation:"Dorsiflexion means bringing the top of the foot up towards the shin. Plantar flexion is the opposite."},
  {id:"a38",type:"mcq",level:"Beginner",topic:"Joint Movements",q:"What is plantar flexion?",options:["Bringing the top of the foot up","Lifting the lateral portion of the foot","Rolling the foot outward","Bringing the bottom of the foot downwards — pointing the foot"],correct:3,explanation:"Plantar flexion means bringing the bottom of the foot downwards — pointing the foot."},
  {id:"a39",type:"mcq",level:"Beginner",topic:"Joint Movements",q:"What is abduction?",options:["Moving toward the midline","Turning the anterior surface outward","Moving away from the midline of the body","Bending a joint"],correct:2,explanation:"Abduction means moving away from the midline. Adduction is the opposite."},
  {id:"a40",type:"mcq",level:"Beginner",topic:"Joint Movements",q:"What is adduction?",options:["Moving away from the midline","Turning the anterior surface inward","Moving toward the midline of the body","Straightening a joint"],correct:2,explanation:"Adduction means moving toward the midline. Abduction is the opposite."},
  {id:"a41",type:"mcq",level:"Beginner",topic:"Joint Movements",q:"What is external rotation?",options:["Turning the anterior surface inward","Moving away from the midline","Bending the joint","Turning the anterior surface outward"],correct:3,explanation:"External rotation means turning the anterior surface outward. Internal rotation is the opposite."},
  {id:"a42",type:"mcq",level:"Intermediate",topic:"Joint Movements",q:"What is inversion of the foot?",options:["Lifting the lateral/outside portion of the foot","Rolling the foot outward","Lifting the medial/inside portion of the foot upwards","Pointing the foot"],correct:2,explanation:"Inversion means lifting the medial/inside portion of the foot upwards. Eversion is the opposite."},
  {id:"a43",type:"mcq",level:"Intermediate",topic:"Joint Movements",q:"What is eversion of the foot?",options:["Lifting the medial/inside portion of the foot","Rolling the foot inward","Flexing the foot upward","Lifting the lateral/outside portion of the foot upwards"],correct:3,explanation:"Eversion means lifting the lateral/outside portion of the foot upwards. Inversion is the opposite."},
  {id:"a44",type:"mcq",level:"Intermediate",topic:"Joint Movements",q:"What is scapular adduction also known as?",options:["Protraction","Elevation","Retraction — bringing the shoulder blade towards the spine","Depression"],correct:2,explanation:"Scapular adduction is also called retraction — bringing the shoulder blade towards the spine."},
  {id:"a45",type:"mcq",level:"Intermediate",topic:"Joint Movements",q:"What is lateral flexion of the spine?",options:["Turning the front of the trunk to one side","Bending the trunk forward","Side-bending of the trunk to the right or left","Extending the trunk backward"],correct:2,explanation:"Lateral flexion of the spine is side-bending of the trunk to the right or left."},
  {id:"a46",type:"mcq",level:"Intermediate",topic:"Joint Movements",q:"What is rotation of the spine?",options:["Side-bending of the trunk","Bending the trunk forward","Extending the trunk backward","Turning the front of the head or trunk to the right or left"],correct:3,explanation:"Rotation means turning the front of the head or trunk to the right or left."},
  {id:"a47",type:"mcq",level:"Intermediate",topic:"Joint Movements",q:"What is scapular elevation?",options:["Lowering the shoulder blade towards the waist","Lifting the shoulder blade up towards the ear","Bringing the shoulder blade towards the spine","Rotating the acromion process upward"],correct:1,explanation:"Scapular elevation means lifting the shoulder blade up towards the ear. Depression is the opposite."},
  {id:"a48",type:"mcq",level:"Intermediate",topic:"Joint Movements",q:"What is scapular depression?",options:["Lifting the shoulder blade up towards the ear","Bringing the shoulder blade forward","Lowering the shoulder blade towards the waist","Rotating the acromion process downward"],correct:2,explanation:"Scapular depression means lowering the shoulder blade towards the waist."},
  {id:"a49",type:"tf",level:"Beginner",topic:"Joint Movements",q:"Dorsiflexion means pointing the foot downward.",correct:false,explanation:"Dorsiflexion means bringing the top of the foot UP towards the shin. Pointing the foot is plantar flexion."},
  {id:"a50",type:"tf",level:"Beginner",topic:"Joint Movements",q:"Abduction means moving away from the midline of the body.",correct:true,explanation:"Abduction means moving away from the midline. Adduction means moving toward the midline."},
  {id:"a51",type:"tf",level:"Intermediate",topic:"Joint Movements",q:"Scapular adduction is also called retraction.",correct:true,explanation:"Scapular adduction (retraction) means bringing the shoulder blade towards the spine."},
  {id:"a52",type:"tf",level:"Intermediate",topic:"Joint Movements",q:"Inversion of the foot means lifting the lateral/outside portion upwards.",correct:false,explanation:"Inversion lifts the MEDIAL/INSIDE portion upward. Lifting the lateral/outside is EVERSION."},
  {id:"a53",type:"tf",level:"Intermediate",topic:"Joint Movements",q:"Lateral flexion of the spine means turning the front of the trunk to one side.",correct:false,explanation:"Lateral flexion is SIDE-BENDING. Turning the front of the trunk is ROTATION."},
  {id:"a54",type:"fill",level:"Beginner",topic:"Joint Movements",q:"Bringing the top of the foot up towards the shin is called ___.",answer:"dorsiflexion",hint:"Flexing the foot upward",explanation:"Dorsiflexion brings the top of the foot toward the shin."},
  {id:"a55",type:"fill",level:"Beginner",topic:"Joint Movements",q:"Bringing the bottom of the foot downwards — pointing — is called ___.",answer:"plantar flexion",hint:"Pointing the foot",explanation:"Plantar flexion brings the bottom of the foot downward."},
  {id:"a56",type:"fill",level:"Intermediate",topic:"Joint Movements",q:"Scapular adduction is also called ___.",answer:"retraction",hint:"Drawing back",explanation:"Scapular adduction (retraction) brings the shoulder blade towards the spine."},
  {id:"a57",type:"fill",level:"Intermediate",topic:"Joint Movements",q:"Side-bending of the trunk to the right or left is called ___ flexion of the spine.",answer:"lateral",hint:"To the side",explanation:"Lateral flexion is side-bending of the trunk."},
  {id:"a58",type:"flashcard",level:"Beginner",topic:"Joint Movements",q:"What is the difference between dorsiflexion and plantar flexion?",answer:"Dorsiflexion — bringing the top of the foot up towards the shin. Plantar flexion — bringing the bottom of the foot downwards (pointing the foot).",explanation:"Dorsiflexion = foot flexed up. Plantar flexion = foot pointed down."},
  {id:"a59",type:"flashcard",level:"Intermediate",topic:"Joint Movements",q:"What is the difference between inversion and eversion of the foot?",answer:"Inversion — lifting the medial/inside portion of the foot upwards. Eversion — lifting the lateral/outside portion of the foot upwards.",explanation:"Inversion = inside up. Eversion = outside up."},
  {id:"a60",type:"error",level:"Intermediate",topic:"Joint Movements",q:"A student says 'Inversion means lifting the outside of the foot upward.' What is wrong?",answer:"Inversion lifts the MEDIAL/INSIDE portion of the foot upward. Lifting the lateral/outside is EVERSION.",explanation:"Inversion = inside up, eversion = outside up."},
  {id:"a61",type:"error",level:"Intermediate",topic:"Joint Movements",q:"A student says 'Lateral flexion of the spine is when I turn to look over my shoulder.' What is wrong?",answer:"Turning to look over the shoulder is spinal ROTATION. Lateral flexion is side-bending of the trunk.",explanation:"Lateral flexion and rotation are distinct movements in different planes."},
  {id:"a62",type:"cue_selection",level:"Intermediate",topic:"Joint Movements",q:"A student is asked to dorsiflex their foot. They point their foot instead. Which correction do you give?",options:["'Flex your foot — bring the top of your foot up toward your shin.'","'Point your toes further.'","'Invert your foot.'","'Plantar flex your ankle.'"],correct:0,explanation:"The student is plantar flexing when they should be dorsiflexing."},
  {id:"a63",type:"mcq",level:"Beginner",topic:"Muscles by Region",q:"Which muscles are the primary movers for spinal flexion?",options:["Erector spinae","Quadratus lumborum","Multifidus only","Rectus abdominis, external oblique, and internal oblique"],correct:3,explanation:"The primary movers for spinal flexion are the rectus abdominis, external oblique, and internal oblique."},
  {id:"a64",type:"mcq",level:"Beginner",topic:"Muscles by Region",q:"Which muscle is the primary mover for spinal extension?",options:["Rectus abdominis","External oblique","Erector spinae","Quadratus lumborum"],correct:2,explanation:"The erector spinae is the primary mover for spinal extension."},
  {id:"a65",type:"mcq",level:"Intermediate",topic:"Muscles by Region",q:"What is the primary action of the transversus abdominis?",options:["Spinal flexion","Spinal rotation","Spinal lateral flexion","Pulls the abdominal wall inward — trunk stabilisation"],correct:3,explanation:"The transversus abdominis pulls the abdominal wall inward and provides trunk stabilisation."},
  {id:"a66",type:"mcq",level:"Beginner",topic:"Muscles by Region",q:"Which muscles produce hip flexion?",options:["Hamstrings and gluteus maximus","Gluteus medius and minimus","Adductor longus and gracilis","Iliopsoas, rectus femoris, and sartorius"],correct:3,explanation:"The primary movers for hip flexion are the iliopsoas, rectus femoris, and sartorius."},
  {id:"a67",type:"mcq",level:"Beginner",topic:"Muscles by Region",q:"Which muscles produce hip extension?",options:["Iliopsoas and rectus femoris","Gluteus medius and minimus","Hamstrings and gluteus maximus","Adductor longus and gracilis"],correct:2,explanation:"The primary movers for hip extension are the hamstrings and gluteus maximus."},
  {id:"a68",type:"mcq",level:"Intermediate",topic:"Muscles by Region",q:"Which muscles produce hip abduction?",options:["Adductor longus, adductor brevis, adductor magnus, gracilis","Iliopsoas and rectus femoris","Hamstrings and gluteus maximus","Gluteus medius and gluteus minimus"],correct:3,explanation:"The primary movers for hip abduction are the gluteus medius and gluteus minimus."},
  {id:"a69",type:"mcq",level:"Intermediate",topic:"Muscles by Region",q:"Which muscles produce hip adduction?",options:["Gluteus medius and gluteus minimus","Hamstrings and gluteus maximus","Adductor longus, adductor brevis, adductor magnus, and gracilis","Iliopsoas and rectus femoris"],correct:2,explanation:"Hip adduction is produced by the adductors longus, brevis, magnus, and gracilis."},
  {id:"a70",type:"mcq",level:"Beginner",topic:"Muscles by Region",q:"Which muscle produces knee extension?",options:["Hamstrings","Gastrocnemius","Quadriceps femoris","Iliopsoas"],correct:2,explanation:"The quadriceps femoris is the primary mover for knee extension."},
  {id:"a71",type:"mcq",level:"Beginner",topic:"Muscles by Region",q:"Which muscles produce ankle-foot plantar flexion?",options:["Tibialis anterior and extensor digitorum longus","Peroneus longus and peroneus brevis","Tibialis posterior only","Gastrocnemius and soleus"],correct:3,explanation:"Ankle-foot plantar flexion is primarily produced by the gastrocnemius and soleus."},
  {id:"a72",type:"mcq",level:"Beginner",topic:"Muscles by Region",q:"Which muscles produce ankle-foot dorsiflexion?",options:["Gastrocnemius and soleus","Peroneus longus and peroneus brevis","Tibialis anterior and extensor digitorum longus","Tibialis posterior"],correct:2,explanation:"Ankle-foot dorsiflexion is produced by the tibialis anterior and extensor digitorum longus."},
  {id:"a73",type:"mcq",level:"Intermediate",topic:"Muscles by Region",q:"Which muscles produce shoulder external rotation?",options:["Subscapularis and teres major","Anterior deltoid and pectoralis major","Infraspinatus and teres minor","Latissimus dorsi and posterior deltoid"],correct:2,explanation:"Shoulder external rotation is produced by the infraspinatus and teres minor — both part of the rotator cuff."},
  {id:"a74",type:"mcq",level:"Beginner",topic:"Muscles by Region",q:"Which muscles produce elbow flexion?",options:["Triceps brachii","Biceps brachii and brachialis","Deltoid and supraspinatus","Infraspinatus and teres minor"],correct:1,explanation:"Elbow flexion is produced by the biceps brachii and brachialis."},
  {id:"a75",type:"mcq",level:"Beginner",topic:"Muscles by Region",q:"Which muscle produces elbow extension?",options:["Biceps brachii","Brachialis","Triceps brachii","Deltoid"],correct:2,explanation:"Elbow extension is produced by the triceps brachii."},
  {id:"a76",type:"tf",level:"Beginner",topic:"Muscles by Region",q:"The rectus abdominis is a primary mover for spinal flexion.",correct:true,explanation:"The rectus abdominis is a primary mover for spinal flexion — along with the external and internal obliques."},
  {id:"a77",type:"tf",level:"Intermediate",topic:"Muscles by Region",q:"The transversus abdominis is primarily a spinal flexor.",correct:false,explanation:"The transversus abdominis pulls the abdominal wall inward and provides trunk stabilisation — it is not primarily a spinal flexor."},
  {id:"a78",type:"tf",level:"Intermediate",topic:"Muscles by Region",q:"The hamstrings produce both hip extension and knee flexion.",correct:true,explanation:"The hamstrings cross two joints — they produce hip extension AND knee flexion."},
  {id:"a79",type:"tf",level:"Intermediate",topic:"Muscles by Region",q:"The gastrocnemius produces only plantar flexion.",correct:false,explanation:"The gastrocnemius produces both ankle-foot plantar flexion AND knee flexion — it crosses two joints."},
  {id:"a80",type:"tf",level:"Advanced",topic:"Muscles by Region",q:"The external obliques rotate the spine to the same side.",correct:false,explanation:"The external obliques rotate the spine to the OPPOSITE side. The internal obliques rotate to the same side."},
  {id:"a81",type:"fill",level:"Beginner",topic:"Muscles by Region",q:"The primary mover for spinal extension is the ___ ___.",answer:"erector spinae",hint:"The long back muscles",explanation:"The erector spinae is the primary mover for spinal extension."},
  {id:"a82",type:"fill",level:"Beginner",topic:"Muscles by Region",q:"The primary movers for hip extension are the ___ and gluteus maximus.",answer:"hamstrings",hint:"Back of the thigh",explanation:"The hamstrings and gluteus maximus are the primary hip extensors."},
  {id:"a83",type:"fill",level:"Intermediate",topic:"Muscles by Region",q:"The primary mover for knee extension is the ___ femoris.",answer:"quadriceps",hint:"Front of the thigh",explanation:"The quadriceps femoris is the primary mover for knee extension."},
  {id:"a84",type:"fill",level:"Advanced",topic:"Muscles by Region",q:"The ___ obliques rotate the spine to the opposite side, while the ___ obliques rotate to the same side.",answer:"external / internal",hint:"Think about the direction of the muscle fibres",explanation:"External obliques → opposite side. Internal obliques → same side."},
  {id:"a85",type:"flashcard",level:"Beginner",topic:"Muscles by Region",q:"What are the primary movers for each spinal movement?",answer:"Flexion — rectus abdominis, external oblique, internal oblique. Extension — erector spinae. Rotation — external oblique, internal oblique, erector spinae. Lateral flexion — quadratus lumborum, external oblique, internal oblique, erector spinae.",explanation:"The abdominals and erector spinae are the key muscle groups for spinal movement."},
  {id:"a86",type:"flashcard",level:"Intermediate",topic:"Muscles by Region",q:"What are the primary movers for hip flexion, extension, abduction, and adduction?",answer:"Flexion — iliopsoas, rectus femoris, sartorius. Extension — hamstrings, gluteus maximus. Abduction — gluteus medius, gluteus minimus. Adduction — adductor longus, adductor brevis, adductor magnus, gracilis.",explanation:"These are the key hip muscles for teaching movement."},
  {id:"a87",type:"flashcard",level:"Intermediate",topic:"Muscles by Region",q:"What are the 4 rotator cuff muscles and their individual actions?",answer:"Supraspinatus — shoulder abduction. Infraspinatus — shoulder external rotation. Teres minor — shoulder external rotation. Subscapularis — shoulder internal rotation. General function: shoulder joint stabilisation.",explanation:"The rotator cuff muscles stabilise the glenohumeral joint."},
  {id:"a88",type:"error",level:"Intermediate",topic:"Muscles by Region",q:"A student says 'The transversus abdominis is the main muscle for spinal flexion.' What is wrong?",answer:"The transversus abdominis primarily pulls the abdominal wall inward and provides trunk stabilisation — it does not produce spinal flexion. The rectus abdominis, external oblique, and internal oblique are the primary flexors.",explanation:"The TA is a stabiliser, not a prime mover for flexion."},
  {id:"a89",type:"error",level:"Advanced",topic:"Muscles by Region",q:"A student says 'The external obliques rotate the spine to the same side.' What is wrong?",answer:"The external obliques rotate to the OPPOSITE side. The internal obliques rotate to the same side.",explanation:"External = opposite, internal = same side."},
  {id:"a90",type:"mcq",level:"Intermediate",topic:"Posture",q:"Lumbar hyperlordosis is frequently associated with which muscle imbalance?",options:["Strong abdominals and flexible hip flexors","Weak glutes and tight hamstrings","Weak abdominals, tight hip flexors, and tight lower back extensors","Strong erector spinae and weak quadriceps"],correct:2,explanation:"Lumbar hyperlordosis: weak abdominals, tight hip flexors, and tight lower back extensors."},
  {id:"a91",type:"mcq",level:"Intermediate",topic:"Posture",q:"Kyphosis involves:",options:["An increased lumbar curve","An increased thoracic curve","A lateral curvature of the spine","A decrease in the normal lumbar curve"],correct:1,explanation:"Kyphosis involves an increased thoracic curve of the spine."},
  {id:"a92",type:"mcq",level:"Intermediate",topic:"Posture",q:"What characterises scoliosis?",options:["Increased lumbar lordosis","Decreased thoracic curve","Hyperextended knees","One or more lateral curvatures of the spine, usually involving rotation of the vertebrae"],correct:3,explanation:"Scoliosis: one or more lateral curvatures of the spine in the coronal plane, usually also involving rotation."},
  {id:"a93",type:"tf",level:"Intermediate",topic:"Posture",q:"Lumbar hyperlordosis is commonly accompanied by an anterior pelvic tilt.",correct:true,explanation:"Lumbar hyperlordosis involves an increased lumbar curve commonly accompanied by anterior pelvic tilt."},
  {id:"a94",type:"tf",level:"Intermediate",topic:"Posture",q:"Kyphosis involves an increased lumbar curve.",correct:false,explanation:"Kyphosis involves an increased THORACIC curve. An increased lumbar curve is lumbar hyperlordosis."},
  {id:"a95",type:"fill",level:"Intermediate",topic:"Posture",q:"Kyphosis involves an increased ___ curve of the spine.",answer:"thoracic",hint:"Upper/middle back",explanation:"Kyphosis involves an increased thoracic curve."},
  {id:"a96",type:"flashcard",level:"Intermediate",topic:"Posture",q:"What are the common types of faulty posture?",answer:"Lumbar hyperlordosis — increased lumbar curve, anterior pelvic tilt. Kyphosis — increased thoracic curve. Flat back — decreased lumbar curve. Fatigue/sway back — pelvis pushed forward, thoracic spine shifted back.",explanation:"Each type has characteristic muscle imbalances that can be addressed through targeted exercise."},
  {id:"a97",type:"error",level:"Intermediate",topic:"Posture",q:"A student says 'Kyphosis is an increased lumbar curve.' What is wrong?",answer:"Kyphosis is an increased THORACIC curve. An increased lumbar curve is lumbar HYPERLORDOSIS.",explanation:"These two postural deviations affect different regions of the spine."},
  {id:"a98",type:"mcq",level:"Intermediate",topic:"Muscle Types & Contractions",q:"What is a concentric contraction?",options:["The muscle lengthens during contraction","No change in muscle length","Contraction against constant speed","The muscle shortens during contraction — positive movement"],correct:3,explanation:"A concentric contraction is a shortening contraction — the muscle shortens and the joint angle decreases."},
  {id:"a99",type:"mcq",level:"Intermediate",topic:"Muscle Types & Contractions",q:"What is an eccentric contraction?",options:["The muscle shortens","No change in muscle length","The muscle lengthens during contraction — negative movement","Contraction producing maximum force only"],correct:2,explanation:"An eccentric contraction: the muscle lengthens while under tension."},
  {id:"a100",type:"mcq",level:"Intermediate",topic:"Muscle Types & Contractions",q:"What is an isometric contraction?",options:["Muscle shortens","Muscle lengthens","Contraction in a static position — no change in muscle length or joint angle","Contraction against constant resistance"],correct:2,explanation:"An isometric contraction: static position, no change in muscle length or joint angle."},
  {id:"a101",type:"mcq",level:"Beginner",topic:"Muscle Types & Contractions",q:"What is the role of an agonist muscle?",options:["The muscle with the opposite action","Neutralises undesired actions","Anchors a body part","The principal muscle in a movement"],correct:3,explanation:"The agonist is the principal muscle in a movement."},
  {id:"a102",type:"mcq",level:"Beginner",topic:"Muscle Types & Contractions",q:"What is the role of an antagonist muscle?",options:["The principal muscle","The muscle with the opposite action to the agonist","Neutralises undesired actions","Anchors a bone"],correct:1,explanation:"The antagonist has the opposite action to the agonist."},
  {id:"a103",type:"mcq",level:"Advanced",topic:"Muscle Types & Contractions",q:"What is co-contraction?",options:["Two exercises performed together","Contracting a muscle eccentrically","Only stabilisers contracting","Simultaneous contraction of the agonist and antagonist to produce a stable joint"],correct:3,explanation:"Co-contraction is the simultaneous contraction of agonist and antagonist to produce joint stability."},
  {id:"a104",type:"mcq",level:"Advanced",topic:"Muscle Types & Contractions",q:"What is the tendency of tonic (postural) muscles?",options:["Toward disuse and weakness","Toward balanced development","Toward fast twitch dominance","Toward overuse and eventual shortening"],correct:3,explanation:"Tonic (postural) muscles tend toward overuse and shortening."},
  {id:"a105",type:"mcq",level:"Advanced",topic:"Muscle Types & Contractions",q:"What is the tendency of phasic muscles?",options:["Toward overuse and shortening","Toward balanced development","Toward disuse and weakness","Toward slow twitch dominance"],correct:2,explanation:"Phasic muscles tend toward disuse and weakness."},
  {id:"a106",type:"tf",level:"Intermediate",topic:"Muscle Types & Contractions",q:"An eccentric contraction is when the muscle lengthens under tension.",correct:true,explanation:"An eccentric (negative) contraction occurs when the muscle lengthens while under tension."},
  {id:"a107",type:"tf",level:"Intermediate",topic:"Muscle Types & Contractions",q:"An isometric contraction changes the angle of the joint.",correct:false,explanation:"An isometric contraction: static position, NO change in muscle length or joint angle."},
  {id:"a108",type:"tf",level:"Advanced",topic:"Muscle Types & Contractions",q:"Tonic muscles tend toward disuse and weakness.",correct:false,explanation:"PHASIC muscles tend toward disuse and weakness. TONIC muscles tend toward overuse and shortening."},
  {id:"a109",type:"fill",level:"Intermediate",topic:"Muscle Types & Contractions",q:"A ___ contraction is when the muscle shortens during contraction.",answer:"concentric",hint:"Positive movement",explanation:"A concentric (positive) contraction occurs when the muscle shortens."},
  {id:"a110",type:"fill",level:"Intermediate",topic:"Muscle Types & Contractions",q:"An ___ contraction is when the muscle lengthens during contraction.",answer:"eccentric",hint:"Negative movement",explanation:"An eccentric (negative) contraction occurs when the muscle lengthens while under tension."},
  {id:"a111",type:"fill",level:"Intermediate",topic:"Muscle Types & Contractions",q:"An ___ contraction occurs in a static position with no change in muscle length or joint angle.",answer:"isometric",hint:"No movement",explanation:"Isometric contractions are used by stabilisers to maintain position without movement."},
  {id:"a112",type:"fill",level:"Beginner",topic:"Muscle Types & Contractions",q:"The principal muscle in a movement is called the ___.",answer:"agonist",hint:"The main mover",explanation:"The agonist is the principal muscle in a movement."},
  {id:"a113",type:"fill",level:"Advanced",topic:"Muscle Types & Contractions",q:"Tonic muscles tend toward overuse and ___, while phasic muscles tend toward disuse and ___.",answer:"shortening / weakness",hint:"Opposite tendencies",explanation:"This imbalance can limit range of motion and neurologically inhibit antagonist function."},
  {id:"a114",type:"flashcard",level:"Intermediate",topic:"Muscle Types & Contractions",q:"What are the 3 types of muscle contraction?",answer:"Concentric — muscle shortens (positive). Eccentric — muscle lengthens (negative). Isometric — static, no change in length or joint angle.",explanation:"Pilates uses all three types of contraction."},
  {id:"a115",type:"flashcard",level:"Intermediate",topic:"Muscle Types & Contractions",q:"What are the 4 roles of muscles in movement?",answer:"Agonist — principal muscle. Antagonist — opposite action. Synergist — neutralises undesired actions. Stabiliser/fixator — anchors or supports a body part.",explanation:"Understanding muscle roles helps analyse and cue exercises precisely."},
  {id:"a116",type:"error",level:"Intermediate",topic:"Muscle Types & Contractions",q:"A student says 'An isometric contraction is when the muscle shortens.' What is wrong?",answer:"An isometric contraction is STATIC — no change in muscle length or joint angle. When the muscle shortens, that is a CONCENTRIC contraction.",explanation:"Isometric = static. Concentric = shortening. Eccentric = lengthening."},
  {id:"a117",type:"scenario",level:"Advanced",topic:"Muscle Types & Contractions",q:"A student's hip flexors are very tight and their abdominals feel weak. How do you explain this relationship using muscle type theory?",answer:"The hip flexors are tonic (postural) muscles — they tend toward overuse and shortening. When they shorten, they can mechanically and neurologically inhibit their antagonists (abdominals/hip extensors). Addressing the hip flexor tightness is as important as strengthening the abdominals.",explanation:"Both sides of the imbalance must be addressed."},
];

const MAT = [
  {id:"m1",type:"mcq",level:"Beginner",theme:"Setup",exercise:"Pelvic Curl",q:"What is the starting position for Pelvic Curl?",options:["Lying prone, arms by sides","Lying supine, knees bent, feet flat on the mat, legs parallel, arms by sides","Sitting upright, legs straight","Kneeling in quadruped"],correct:1,explanation:"Pelvic Curl: lying supine in neutral spine, legs parallel, knees bent, feet placed firmly on mat, arms by sides."},
  {id:"m2",type:"tf",level:"Beginner",theme:"Breathing",exercise:"Pelvic Curl",q:"In Pelvic Curl, you exhale to roll the spine UP off the mat.",correct:true,explanation:"Exhale to draw the abdominals in and initiate the posterior pelvic tilt rolling the spine up. Inhale at the top, exhale to roll back down."},
  {id:"m3",type:"fill",level:"Beginner",theme:"Cues",exercise:"Pelvic Curl",q:"Complete the cue: 'Peel each ___ up and down.'",answer:"vertebra",hint:"Sequential spinal articulation",explanation:"'Peel each vertebra up and down' encourages sequential spinal articulation."},
  {id:"m4",type:"fill",level:"Beginner",theme:"Cues",exercise:"Pelvic Curl",q:"Complete the cue: 'Draw your ___ in before you move.'",answer:"abdominals",hint:"The core muscles",explanation:"Drawing the abdominals in before moving is the first key focus."},
  {id:"m5",type:"fill",level:"Beginner",theme:"Cues",exercise:"Pelvic Curl",q:"Complete the cue: 'Drop through your ___.'",answer:"breastbones",hint:"The sternum area",explanation:"'Drop through your breastbones' initiates the curl."},
  {id:"m6",type:"mcq",level:"Intermediate",theme:"Cues",exercise:"Pelvic Curl",q:"Which cue helps you feel the hamstrings working at the top of Pelvic Curl?",options:["Press the knees together","Draw the feet towards your glutes","Point the toes","Squeeze the inner thighs"],correct:1,explanation:"'Draw the feet towards your glutes' activates the hamstrings."},
  {id:"m7",type:"mcq",level:"Intermediate",theme:"Cues",exercise:"Pelvic Curl",q:"What stabilises the upper body during Pelvic Curl?",options:["The neck muscles","Hands gripping the mat","The shoulder extensors — press your arms into the mat","Upper trapezius"],correct:2,explanation:"The shoulder extensors stabilise — press the arms into the mat."},
  {id:"m8",type:"mcq",level:"Intermediate",theme:"Cues",exercise:"Pelvic Curl",q:"Once the posterior tilt is maximised in Pelvic Curl, what lifts the structure?",options:["The hip flexors","The abdominals alone","The quadriceps","The hip extensors"],correct:3,explanation:"Once the posterior tilt is maximised, the hip extensors lift the structure while the shoulder extensors stabilise."},
  {id:"m9",type:"tf",level:"Intermediate",theme:"Cues",exercise:"Pelvic Curl",q:"In Pelvic Curl, the hip extensors kick in as you lift the pelvis to reach a straight line.",correct:true,explanation:"Once the posterior tilt is maximised, the hip extensors lift the structure to reach a straight diagonal line."},
  {id:"m10",type:"mcq",level:"Beginner",theme:"Muscles",exercise:"Pelvic Curl",q:"What does Pelvic Curl primarily train?",options:["Hip flexors and quadriceps","Shoulder stability","Abdominals, back extensors, glutes, hamstrings, and spinal articulation","Lateral flexors only"],correct:2,explanation:"Pelvic Curl trains the abdominals and obliques, back extensors, glutes and hamstrings, and spinal articulation."},
  {id:"m11",type:"mcq",level:"Beginner",theme:"Modifications",exercise:"Pelvic Curl",q:"For a student who cannot maintain spinal alignment in Pelvic Curl, what is the best modification?",options:["Skip the exercise","Extend the legs straight","Do it standing","Reduce the height of the lift"],correct:3,explanation:"Reducing the height of the lift allows the student to maintain alignment and build strength progressively."},
  {id:"m12",type:"flashcard",level:"Beginner",theme:"Cues",exercise:"Pelvic Curl",q:"What are the 3 key focuses in Pelvic Curl?",answer:"1. Draw the abs in before you move. 2. Peel each vertebra up and down. 3. Maintain posterior pelvic tilt throughout.",explanation:"These three cues are the foundation of correct Pelvic Curl execution."},
  {id:"m13",type:"mcq",level:"Beginner",theme:"Setup",exercise:"Spine Twist Supine",q:"What is the arm position in Spine Twist Supine?",options:["Arms overhead","Arms by the sides","Arms crossed over the chest","Arms in a T position, palms facing up"],correct:3,explanation:"Arms are out in a T position with palms facing up — anchoring the upper body."},
  {id:"m14",type:"tf",level:"Beginner",theme:"Breathing",exercise:"Spine Twist Supine",q:"In Spine Twist Supine, you inhale as the legs lower to one side.",correct:true,explanation:"Inhale as the legs lower, exhale to bring them back to center using the obliques."},
  {id:"m15",type:"mcq",level:"Intermediate",theme:"Cues",exercise:"Spine Twist Supine",q:"Which cue addresses the most common compensation in Spine Twist Supine?",options:["Squeeze your glutes","Keep your arms pressing into the mat","Twist from the spine/waist — not from the pelvis. The hips should not go to your ribs.","Look toward the ceiling"],correct:2,explanation:"The most common compensation is the pelvis lifting. The key cue: 'twist from the spine/waist — the hips should not go to your ribs.'"},
  {id:"m16",type:"fill",level:"Intermediate",theme:"Cues",exercise:"Spine Twist Supine",q:"Complete the cue: 'Bring your legs back with your ___.'",answer:"obliques",hint:"The rotational muscles",explanation:"The obliques bring the legs back to center."},
  {id:"m17",type:"mcq",level:"Beginner",theme:"Setup",exercise:"Chest Lift",q:"What is the starting position for Chest Lift?",options:["Lying prone, hands by temples","Sitting upright","Lying supine, neutral spine, knees bent, feet hip-width apart, fingers interlaced behind head","Lying supine, legs straight"],correct:2,explanation:"Chest Lift: lying supine in neutral spine, knees bent, feet hip-width apart, fingers interlaced behind the head."},
  {id:"m18",type:"mcq",level:"Beginner",theme:"Breathing",exercise:"Chest Lift",q:"In Chest Lift, which breath is used to lift the head and chest?",options:["Inhale","Hold the breath","Either breath","Exhale"],correct:3,explanation:"Exhale to lift the head and chest — the exhale supports abdominal engagement."},
  {id:"m19",type:"mcq",level:"Beginner",theme:"Cues",exercise:"Chest Lift",q:"What does 'lift the abdominals rather than the neck' address in Chest Lift?",options:["Getting the chest higher","Keeping the legs still","Maintaining neutral pelvis","Preventing neck tension by redirecting effort to the core"],correct:3,explanation:"This cue redirects effort from the neck to the abdominals."},
  {id:"m20",type:"fill",level:"Beginner",theme:"Cues",exercise:"Chest Lift",q:"Complete the cue: 'Slide your ribs ___ to the pelvis as you go up.'",answer:"down",hint:"Direction of rib movement",explanation:"'Slide your ribs down to the pelvis' encourages abdominal engagement."},
  {id:"m21",type:"tf",level:"Beginner",theme:"Cues",exercise:"Chest Lift",q:"In Chest Lift, the pelvis should stay anchored throughout the movement.",correct:true,explanation:"Keeping the pelvis anchored throughout is one of the key focuses of Chest Lift."},
  {id:"m22",type:"mcq",level:"Beginner",theme:"Muscles",exercise:"Chest Lift",q:"What does Chest Lift primarily train?",options:["Hip flexors and quadriceps","Spinal extension","Abdominals, obliques, and pelvic/lumbar stability","Shoulder stability"],correct:2,explanation:"Chest Lift trains the abdominals and obliques, along with pelvic and lumbar stability."},
  {id:"m23",type:"mcq",level:"Intermediate",theme:"Cues",exercise:"Chest Lift with Rotation",q:"In Chest Lift with Rotation, 'head, shoulder and chest move as one unit' prevents which error?",options:["The pelvis moving","The legs lifting","The lower back arching","The elbow leading the rotation"],correct:3,explanation:"This cue prevents the elbow pulling the rotation — the entire upper body rotates as one block."},
  {id:"m24",type:"tf",level:"Beginner",theme:"Cues",exercise:"Chest Lift with Rotation",q:"In Chest Lift with Rotation, the legs should remain still throughout.",correct:true,explanation:"The legs do not move. The pelvis stays neutral and only the upper body rotates."},
  {id:"m25",type:"mcq",level:"Beginner",theme:"Cues",exercise:"Single Leg Lift",q:"What is the primary focus of Single Leg Lift?",options:["Strengthening the quadriceps","Spinal articulation","Hip flexor control and disassociation while maintaining a completely neutral pelvis","Shoulder stability"],correct:2,explanation:"Single Leg Lift develops hip flexor control and disassociation — moving one leg independently while keeping the pelvis completely neutral."},
  {id:"m26",type:"fill",level:"Beginner",theme:"Cues",exercise:"Single Leg Lift",q:"In Single Leg Lift, the movement comes from the ___ joint only.",answer:"hip",hint:"Where the leg connects to the pelvis",explanation:"The movement comes from the hip joint only — the pelvis stays completely neutral."},
  {id:"m27",type:"tf",level:"Beginner",theme:"Cues",exercise:"Single Leg Lift",q:"In Single Leg Lift, the knee stays at a 90-degree angle throughout.",correct:true,explanation:"The knee stays at 90 degrees — the movement comes from the hip joint only."},
  {id:"m28",type:"mcq",level:"Intermediate",theme:"Breathing",exercise:"Single Leg Lift",q:"What is the breathing cue for Single Leg Lift?",options:["Exhale touch, inhale lift","Inhale touch, exhale lift","Hold the breath","No specific pattern"],correct:1,explanation:"'Inhale touch, exhale lift' — inhale as the toes touch the mat, exhale as the leg lifts."},
  {id:"m29",type:"fill",level:"Beginner",theme:"Cues",exercise:"Leg Changes",q:"Complete the cue: 'Scoop the ___ in.'",answer:"belly",hint:"Drawing the core in",explanation:"'Scoop the belly in' maintains core engagement throughout Leg Changes."},
  {id:"m30",type:"fill",level:"Beginner",theme:"Cues",exercise:"Leg Changes",q:"Complete the cue: 'Your hips are ___.'",answer:"heavy",hint:"Keep them grounded",explanation:"'Your hips are heavy' prevents the pelvis from rocking as the legs alternate."},
  {id:"m31",type:"mcq",level:"Beginner",theme:"Setup",exercise:"Hundred Prep",q:"What is the starting position for Hundred Prep?",options:["Legs straight on the mat","Lying supine, both legs in tabletop, arms reaching overhead with palms facing up","Legs straight up to the ceiling","One leg in tabletop, one straight"],correct:1,explanation:"Hundred Prep: lying supine, both legs in tabletop (hips and knees at ~90 degrees), arms reaching overhead with palms facing up."},
  {id:"m32",type:"fill",level:"Beginner",theme:"Cues",exercise:"Hundred Prep",q:"In Hundred Prep, the arms do not touch the floor — they are aligned with the ___.",answer:"shoulders",hint:"Think of arm height",explanation:"The arms are aligned with the shoulders — not touching the floor."},
  {id:"m33",type:"tf",level:"Beginner",theme:"Cues",exercise:"Hundred Prep",q:"In Hundred Prep, the back ribs stay connected to the mat.",correct:true,explanation:"'The back ribs stay connected to the mat' ensures the spine stays in neutral."},
  {id:"m34",type:"mcq",level:"Beginner",theme:"Setup",exercise:"Roll Up",q:"What is the arm position at the start of Roll Up?",options:["Arms by the sides","Arms in T position","Hands interlaced behind the head","Arms reaching overhead, palms facing each other, not touching the floor"],correct:3,explanation:"Roll Up: arms reaching overhead, palms facing each other, aligned with the shoulders — not on the floor."},
  {id:"m35",type:"mcq",level:"Intermediate",theme:"Breathing",exercise:"Roll Up",q:"In Roll Up, what is the correct breathing sequence?",options:["Exhale up, exhale down","Inhale throughout","Hold breath on the way up","Inhale to lift arms and begin; exhale to roll up; inhale to pause; exhale to roll back down"],correct:3,explanation:"Inhale to lift the arms and head/chest; exhale to roll up; inhale to pause; exhale to roll back down."},
  {id:"m36",type:"fill",level:"Intermediate",theme:"Cues",exercise:"Roll Up",q:"In Roll Up, the cue 'find your ___ at the top' describes the shape of the spine.",answer:"C-shape",hint:"A curved letter",explanation:"'Find your C-shape at the top' — the spine is in a C-curve at the peak of the Roll Up."},
  {id:"m37",type:"fill",level:"Beginner",theme:"Cues",exercise:"Roll Up",q:"In Roll Up, 'imagine you go over a ___ — do not lean too far forward.'",answer:"ball",hint:"A round object",explanation:"Imagining going over a ball creates the C-curve and prevents excessive forward lean."},
  {id:"m38",type:"mcq",level:"Beginner",theme:"Setup",exercise:"Leg Circles",q:"What is the starting position for Leg Circles?",options:["Both legs in tabletop","Both legs straight on the mat","One leg straight up (dorsiflexed), other leg on mat (plantarflexed), arms by sides or in T","One leg up, other leg bent"],correct:2,explanation:"Leg Circles: one leg straight up (dorsiflexed), other leg on the mat (plantarflexed), arms by sides or in T."},
  {id:"m39",type:"tf",level:"Intermediate",theme:"Cues",exercise:"Leg Circles",q:"In Leg Circles, it is better for the working leg to be vertical even if not perfectly straight.",correct:true,explanation:"A vertical leg keeps the abdominals working. If the leg drops too low, the hip flexors dominate."},
  {id:"m40",type:"fill",level:"Intermediate",theme:"Cues",exercise:"Leg Circles",q:"In Leg Circles, think of that ___ and lift sensation.",answer:"drop",hint:"Two sensations describing the circular path",explanation:"'Think of that drop and lift sensation' describes the quality of the circle."},
  {id:"m41",type:"mcq",level:"Beginner",theme:"Setup",exercise:"Roll-Like-a-Ball",q:"What is the starting position for Roll-Like-a-Ball?",options:["Lying supine, legs in tabletop","Sitting upright, legs straight","Sitting in balanced position, body in ball shape, legs bent, hands on shins close to ankles, feet off the mat","Kneeling with arms forward"],correct:2,explanation:"Roll-Like-a-Ball: sitting in a balanced ball shape, legs bent, hands on shins close to the ankles, feet off the mat."},
  {id:"m42",type:"mcq",level:"Intermediate",theme:"Cues",exercise:"Roll-Like-a-Ball",q:"In Roll-Like-a-Ball, where should the head be during the roll?",options:["Touching the mat on each roll","Neutral, facing the ceiling","Extended back","In line with the C-curved spine — the head does NOT touch the floor"],correct:3,explanation:"The head does NOT touch the floor. It stays in line with the C-curved spine throughout."},
  {id:"m43",type:"fill",level:"Intermediate",theme:"Cues",exercise:"Roll-Like-a-Ball",q:"Complete the cue: 'Keep the skull in the same ___ as the spine (C curve).'",answer:"shape",hint:"What the skull mirrors",explanation:"'Keep the skull in the same shape as the spine' — the head stays aligned with the C-curve."},
  {id:"m44",type:"mcq",level:"Beginner",theme:"Setup",exercise:"Spine Stretch",q:"What is the starting position for Spine Stretch Forward?",options:["Lying supine, arms overhead","Sitting cross-legged","Kneeling upright","Sitting upright, legs straight, feet dorsiflexed shoulder-width apart, arms reaching forward parallel to mat"],correct:3,explanation:"Spine Stretch Forward: sitting upright, legs straight, feet dorsiflexed shoulder-width apart, arms reaching forward at shoulder height."},
  {id:"m45",type:"fill",level:"Intermediate",theme:"Cues",exercise:"Spine Stretch",q:"Complete the cue: 'Imagine a ___ behind you and first roll the skull down.'",answer:"wall",hint:"A vertical structure behind you",explanation:"'Imagine a wall behind you' helps maintain spinal length before initiating the curve."},
  {id:"m46",type:"mcq",level:"Beginner",theme:"Modifications",exercise:"Spine Stretch",q:"For a student with tight hamstrings in Spine Stretch Forward, what is the best modification?",options:["Skip the exercise","Force the stretch","Bend both knees wide","Have them sit on a folded blanket to allow an anterior pelvic tilt"],correct:3,explanation:"Sitting on a folded blanket reduces hamstring tension so the student can access spinal flexion."},
  {id:"m47",type:"mcq",level:"Beginner",theme:"Cues",exercise:"Side Lifts",q:"What imagery cue is used in Side Lifts to feel the lateral flexion?",options:["Imagine a wall behind you","Reach the top of your head to the ceiling","Think of a blueberry between your waist and the mat — when you lift, pop it","Melt your ribs toward the mat"],correct:2,explanation:"'Think like you have a blueberry between your waist and the mat — when you lift, you want to pop that blueberry.'"},
  {id:"m48",type:"fill",level:"Intermediate",theme:"Cues",exercise:"Side Lifts",q:"Complete the cue: 'The ___ bones are going closer to the ribs (lateral flexion).'",answer:"ASIS",hint:"Bony landmark at the front of the pelvis",explanation:"'The ASIS bones are going closer to the ribs' describes lateral flexion of the trunk."},
  {id:"m49",type:"mcq",level:"Beginner",theme:"Setup",exercise:"Back Extension",q:"What is the starting position for Back Extension?",options:["Lying prone, trunk lifted, arms bent","Lying prone, arms overhead","Lying prone, head aligned with spine, arms straight and by sides pressing against legs","Kneeling, arms by sides"],correct:2,explanation:"Back Extension: lying prone, head aligned with spine, arms straight and by sides pressing against the legs."},
  {id:"m50",type:"fill",level:"Beginner",theme:"Cues",exercise:"Back Extension",q:"In Back Extension, 'Inhale: find the ___.'",answer:"length",hint:"Creating space in the spine",explanation:"'Inhale: find the length' — inhalation creates length in the spine before the extension."},
  {id:"m51",type:"mcq",level:"Beginner",theme:"Setup",exercise:"Rest Position",q:"What is the setup for Rest Position?",options:["Lying supine, arms overhead","From kneeling, hips back toward heels, trunk folded forward over thighs, arms extended overhead or resting by sides","Sitting cross-legged","Lying prone, head resting on hands"],correct:1,explanation:"Rest Position: from kneeling, sit the hips back toward the heels, fold the trunk forward, arms extended overhead or resting by sides."},
  {id:"m52",type:"mcq",level:"Beginner",theme:"Muscles",exercise:"Rest Position",q:"What does Rest Position develop?",options:["Hip flexor strength","Back extension","Abdominal strength","Spinal decompression, lower back and hip flexor release"],correct:3,explanation:"Rest Position develops spinal decompression and lower back and hip flexor release."},
  {id:"m53",type:"mcq",level:"Intermediate",theme:"Breathing",exercise:"Hundred",q:"In the Hundred, what is the breathing pattern?",options:["Hold breath for 10 counts","Exhale for 10, inhale for 10","Breathe naturally","5 counts inhale pumping, 5 counts exhale pumping — repeated for 10 cycles"],correct:3,explanation:"5 counts inhale pumping, 5 counts exhale pumping, repeated for 10 cycles — 100 arm pumps total."},
  {id:"m54",type:"mcq",level:"Intermediate",theme:"Modifications",exercise:"Hundred",q:"What modification can be offered if the full Hundred position is too demanding?",options:["Skip the exercise","Do it standing","Remove the arm pumps","Keep legs in tabletop instead of extending them"],correct:3,explanation:"If the full Hundred is too hard, legs can remain in tabletop — reducing the demand on the hip flexors."},
  {id:"m55",type:"tf",level:"Intermediate",theme:"Cues",exercise:"Hundred",q:"In the Hundred, there is no need to squeeze the glutes.",correct:true,explanation:"'No need to squeeze the glutes' — the focus is on abdominal work and arm pumps."},
  {id:"m56",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Double Leg Stretch",q:"What is the starting position for Double Leg Stretch?",options:["Legs straight on the mat","Legs in tabletop, hands on knees, shins parallel to mat, trunk in Chest Lift","Legs perpendicular to the mat","Legs crossed at the ankles"],correct:1,explanation:"Double Leg Stretch: legs in tabletop, hands on knees, shins parallel to mat, trunk in Chest Lift."},
  {id:"m57",type:"tf",level:"Intermediate",theme:"Cues",exercise:"Double Leg Stretch",q:"In Double Leg Stretch, the trunk, pelvic floor and head do not move.",correct:true,explanation:"'The trunk, the pelvic floor and the head do not move' — maintaining this stable base is key."},
  {id:"m58",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Single Leg Stretch",q:"In Single Leg Stretch, which hand goes to the outside of the knee?",options:["The inside hand","The hand closest to the body","Both hands hold the shin","The outside hand"],correct:3,explanation:"The outside hand goes to the outside of the knee, and the inside hand holds the ankle. This protects the knee joint."},
  {id:"m59",type:"mcq",level:"Intermediate",theme:"Muscles",exercise:"Criss Cross",q:"What does Criss Cross add compared to Double Leg Stretch in terms of muscle demand?",options:["Lateral flexion","Hip extension","Shoulder flexion","Spinal rotation — targeting the obliques specifically"],correct:3,explanation:"Criss Cross adds spinal rotation — the trunk rotates toward the bent knee, specifically targeting the obliques."},
  {id:"m60",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Saw",q:"What is the starting position for Saw?",options:["Lying supine, arms in T","Sitting cross-legged","Sitting upright, legs straight, feet dorsiflexed wider than shoulder-width, arms in T, palms facing forward","Lying prone"],correct:2,explanation:"Saw: sitting upright, legs straight, feet dorsiflexed wider than shoulder-width, arms in T, palms facing forward."},
  {id:"m61",type:"mcq",level:"Intermediate",theme:"Breathing",exercise:"Saw",q:"In Saw, what is the correct breath sequence?",options:["Exhale to rotate, inhale to reach","Hold breath throughout","Inhale and exhale both on the rotation","Inhale to rotate from the waist (flat back), exhale to reach forward"],correct:3,explanation:"Inhale and twist from the waist with a flat back, then exhale to reach forward. The exhale deepens the rotation."},
  {id:"m62",type:"fill",level:"Intermediate",theme:"Cues",exercise:"Saw",q:"In Saw, the sit bones stay on the ___ throughout.",answer:"floor",hint:"Where the sit bones stay",explanation:"'The sit bones are on the floor' — the pelvis stays squared and grounded."},
  {id:"m63",type:"tf",level:"Intermediate",theme:"Cues",exercise:"Corkscrew",q:"In Corkscrew, the primary goal is to achieve the greatest range of motion and go as low as possible.",correct:false,explanation:"The goal of Corkscrew is NOT range — the goal is control. There should be no movement in the lumbar spine."},
  {id:"m64",type:"fill",level:"Intermediate",theme:"Cues",exercise:"Corkscrew",q:"In Corkscrew, the half circle is like a ___.",answer:"smiley",hint:"A facial expression",explanation:"'The half circle is like a smiley' — the legs trace a smiley face shape."},
  {id:"m65",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Single Leg Kick",q:"What is the starting position for Single Leg Kick?",options:["Lying supine, legs in tabletop","Lying prone, trunk lifted, arms bent, elbows under shoulders, fingers interlaced, legs straight and together lifted off mat","Lying prone, arms overhead","Sitting upright"],correct:1,explanation:"Single Leg Kick: lying prone, trunk lifted, arms bent, elbows directly under shoulders, fingers interlaced, legs straight and together, slightly lifted."},
  {id:"m66",type:"mcq",level:"Intermediate",theme:"Muscles",exercise:"Single Leg Kick",q:"In Single Leg Kick, the legs are lifted using which muscles?",options:["Hip flexors","Quadriceps","Adductors","Hip extensors — glutes and hamstrings"],correct:3,explanation:"In Single Leg Kick, the legs are lifted using the hip extensors — glutes and hamstrings."},
  {id:"m67",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Cat Stretch",q:"What is the starting position for Cat Stretch?",options:["Lying prone","Kneeling in quadruped position, neutral spine, wrists under shoulders, knees under hips","Sitting upright","Lying supine"],correct:1,explanation:"Cat Stretch: kneeling in quadruped, neutral spine, wrists under shoulders, knees under hips."},
  {id:"m68",type:"mcq",level:"Intermediate",theme:"Cues",exercise:"Cat Stretch",q:"In Cat Stretch, which part of the spine initiates the flexion?",options:["Thoracic spine first","Cervical spine first","All segments simultaneously","Lumbar spine (lower back) first, then the rest follows"],correct:3,explanation:"In Cat Stretch, the lumbar spine moves into flexion first, then the rest follows."},
  {id:"m69",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Front Support",q:"What is the starting position for Front Support?",options:["Lying prone","Starting on all fours, bring one leg then the other out to plank — arms straight, wrists under shoulders, legs straight and parallel, feet hip-width","Kneeling upright","Sitting upright"],correct:1,explanation:"Front Support: starting on all fours, bring legs out to plank — arms straight, wrists under shoulders, legs straight and parallel."},
  {id:"m70",type:"tf",level:"Intermediate",theme:"Cues",exercise:"Front Support",q:"In Front Support, the inside of the elbows should face one another to avoid hyperflexion.",correct:true,explanation:"'No hyperflexion of the elbow — the inside of the elbows should face one another' ensures safe elbow alignment."},
  {id:"m71",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Back Support",q:"In Back Support, which way do the fingers point?",options:["Away from the feet","To the sides","Interlaced behind the pelvis","Toward the feet"],correct:3,explanation:"In Back Support, hands behind the pelvis with fingers pointing toward the feet."},
  {id:"m72",type:"mcq",level:"Intermediate",theme:"Cues",exercise:"Back Support",q:"In Back Support, what shape should the body form when the hips are fully lifted?",options:["A curved C-shape","A V-shape","An arch with only the hips lifted","A straight diagonal line from feet to shoulders"],correct:3,explanation:"'As you are up, you want to be in a straight diagonal line' from feet to shoulders."},
  {id:"m73",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Seal Puppy",q:"What is the starting position for Seal Puppy?",options:["Sitting upright, legs straight","Lying supine, legs in tabletop","Kneeling in quadruped","Sitting in balanced ball shape, legs bent, arms wrapped under legs, feet plantarflexed, palms on top of feet"],correct:3,explanation:"Seal Puppy: sitting in a balanced ball shape, legs bent, arms wrapped under legs, feet plantarflexed, palms on top of feet."},
  {id:"m74",type:"fill",level:"Intermediate",theme:"Cues",exercise:"Seal Puppy",q:"In Seal Puppy, clap the feet from the ___ not from the knees.",answer:"hips",hint:"Hip adduction",explanation:"'Clap the feet from the hips not from the knees' — the clap comes from hip adduction."},
  {id:"m75",type:"tf",level:"Intermediate",theme:"Cues",exercise:"Seal Puppy",q:"In Seal Puppy, the rolling comes from the abdominals not the legs.",correct:true,explanation:"'The rolling comes from the abdominals not the legs' — the core initiates and controls the rolling."},
  {id:"m76",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Open Leg Rocker",q:"What is the starting position for Open Leg Rocker?",options:["Lying supine, legs straight","Kneeling upright","Sitting upright, legs straight","Sitting in balanced position, back flat, one hand holding each ankle, legs shoulder-width apart, arms straight, feet plantarflexed"],correct:3,explanation:"Open Leg Rocker: sitting in balanced position, back flat, one hand holding each ankle, legs shoulder-width apart, feet plantarflexed."},
  {id:"m77",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Shoulder Bridge Prep",q:"What is the starting position for Shoulder Bridge Prep?",options:["Lying supine, neutral spine","Sitting upright","Starting in the up phase of Pelvic Curl","Lying prone"],correct:2,explanation:"Shoulder Bridge Prep starts in the up phase of Pelvic Curl."},
  {id:"m78",type:"mcq",level:"Advanced",theme:"Breathing",exercise:"Shoulder Bridge Prep",q:"What is the key difference in breathing between Shoulder Bridge Prep and Shoulder Bridge?",options:["Both exhale up","Both inhale down","Shoulder Bridge Prep: exhale up / Shoulder Bridge: exhale down","Shoulder Bridge Prep: inhale up / Shoulder Bridge: exhale up"],correct:2,explanation:"Shoulder Bridge Prep: exhale up. Shoulder Bridge: exhale down. This is a key distinction."},
  {id:"m79",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Side Kick",q:"What is the starting position for Side Kick?",options:["Lying flat on side","Lying on side, leaning on elbow, fingers touching sides of head, trunk lifted, legs aligned with body, top leg at hip height","Kneeling on one knee","Sitting sideways"],correct:1,explanation:"Side Kick: lying on side, leaning on elbow, fingers touching sides of head, trunk lifted, legs aligned, top leg at hip height."},
  {id:"m80",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Double Leg Kick",q:"What is the starting position for Double Leg Kick?",options:["Lying prone, arms forward","Lying prone, legs lifted off mat, fingers interlaced behind back, arms relaxed, head to side, cheek resting on mat","Lying supine","Kneeling"],correct:1,explanation:"Double Leg Kick: lying prone, legs straight and together lifted, fingers interlaced behind back, head to side, cheek on mat."},
  {id:"m81",type:"fill",level:"Intermediate",theme:"Cues",exercise:"Double Leg Kick",q:"In Double Leg Kick, kick 3 times, then ___ and lift on the inhale.",answer:"lengthen",hint:"What happens after the kicks",explanation:"'Kick 3 times, lengthen and lift on the inhale' — after 3 pulses the spine extends and the arms lift."},
  {id:"m82",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Swimming",q:"What is the starting position for Swimming?",options:["Lying supine, arms overhead","Kneeling on all fours","Lying prone, arms straight reaching forward, legs straight reaching back, chest arms and legs lifted off mat, head between arms","Lying on side"],correct:2,explanation:"Swimming: lying prone, arms reaching forward, legs reaching back, everything lifted off the mat, head between arms."},
  {id:"m83",type:"mcq",level:"Intermediate",theme:"Breathing",exercise:"Swimming",q:"What is the breathing pattern for Swimming?",options:["Exhale for 10 counts","Hold the breath for 5 counts","Inhale for 5 counts, exhale for 5 counts","Breathe naturally"],correct:2,explanation:"'Inhale for 5 counts, exhale for 5 counts' — the breath matches the swimming rhythm."},
  {id:"m84",type:"fill",level:"Intermediate",theme:"Cues",exercise:"Swimming",q:"In Swimming, the pelvis stays ___ on the mat.",answer:"heavy",hint:"Grounded",explanation:"'The pelvis stays heavy on the mat' — avoid rotation of the torso as the arms and legs alternate."},
  {id:"m85",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Teaser Prep",q:"What is the starting position for Teaser Prep?",options:["Lying supine","Standing","Sitting in balanced position, back flat, arms reaching forward in line with shoulders, legs lifted, knees bent, shins parallel to mat","Kneeling"],correct:2,explanation:"Teaser Prep: sitting in balanced position, back flat, arms reaching forward, legs lifted, knees bent, shins parallel to mat."},
  {id:"m86",type:"fill",level:"Advanced",theme:"Cues",exercise:"Teaser Prep",q:"In Teaser Prep, keep the legs completely ___ as you hinge backwards.",answer:"still",hint:"The legs don't move",explanation:"'Keep the legs completely still' — the challenge is to hinge the trunk backwards without changing the leg position."},
  {id:"m87",type:"mcq",level:"Advanced",theme:"Setup",exercise:"Shoulder Bridge",q:"What is the starting position for Shoulder Bridge?",options:["Starting in Pelvic Curl down phase","Starting in up phase of Pelvic Curl, one leg straight, foot plantarflexed, reaching toward ceiling","Lying supine, both legs straight","Sitting upright"],correct:1,explanation:"Shoulder Bridge: starting in the up phase of Pelvic Curl, one leg straight, foot plantarflexed, reaching toward ceiling."},
  {id:"m88",type:"fill",level:"Advanced",theme:"Cues",exercise:"Shoulder Bridge",q:"In Shoulder Bridge, point the feet as the leg goes ___, flex it as the leg goes ___.",answer:"down / up",hint:"Direction of leg movement with foot position",explanation:"'Point as the leg goes down, flex as it goes up' — this increases the hamstring stretch."},
  {id:"m89",type:"mcq",level:"Advanced",theme:"Setup",exercise:"Swan Dive Prep",q:"What is the starting position for Swan Dive Prep?",options:["Lying prone, arms overhead","Lying prone, elbows close to sides of body, forearms pressing into mat","Kneeling upright","Lying supine"],correct:1,explanation:"Swan Dive Prep: lying prone, elbows close to sides, forearms pressing into the mat."},
  {id:"m90",type:"fill",level:"Advanced",theme:"Cues",exercise:"Swan Dive Prep",q:"In Swan Dive Prep, your body acts like a boat in the sea with waves, the ___ of the boat stays the same.",answer:"shape",hint:"The consistent element",explanation:"'Your body acts like a boat in the sea with waves, the shape of the boat stays the same.'"},
  {id:"m91",type:"mcq",level:"Advanced",theme:"Setup",exercise:"Teaser 1",q:"What is the starting position for Teaser 1?",options:["Lying supine, legs in tabletop","Sitting cross-legged","Balance in V position, legs straight and together on diagonal, back flat, arms overhead","Kneeling upright"],correct:2,explanation:"Teaser 1: balancing in V position, legs straight on a diagonal, back flat, arms overhead."},
  {id:"m92",type:"tf",level:"Advanced",theme:"Cues",exercise:"Teaser 1",q:"In Teaser 1, when you are down, you relax completely before coming back up.",correct:false,explanation:"'When you are down, do not relax so you can come up' — maintaining tension at the bottom allows the rebound."},
  {id:"m93",type:"fill",level:"Advanced",theme:"Breathing",exercise:"Teaser 1",q:"For all Teasers, ___ as you come up.",answer:"inhale",hint:"Which breath lifts you",explanation:"'For all teasers, inhale as you come up' — the inhale lifts the trunk."},
  {id:"m94",type:"mcq",level:"Advanced",theme:"Cues",exercise:"Neck Pull",q:"In Neck Pull, what is the correct sequence of breath and movement?",options:["Exhale to chest lift, then inhale all the way","Inhale to chest lift, exhale reach long come up and over, inhale extend spine long, exhale tilt the pelvis and roll down","Hold breath throughout","Inhale throughout"],correct:1,explanation:"Inhale to chest lift; exhale reach long come up and over; inhale extend the spine long; exhale tilt the pelvis and roll down."},
  {id:"m95",type:"fill",level:"Advanced",theme:"Cues",exercise:"Neck Pull",q:"In Neck Pull, as you go down, ___ back first and then you curl.",answer:"hinge",hint:"First movement going down",explanation:"'As you go down, hinge back first and then you curl.'"},
  {id:"m96",type:"mcq",level:"Advanced",theme:"Setup",exercise:"Side Kick Kneeling",q:"What is the starting position for Side Kick Kneeling?",options:["Lying on side","Sitting sideways","Kneeling on one knee, shoulder over wrist, fingers facing away from body, top leg lifted to hip height, fingers touching behind head","Kneeling on both knees"],correct:2,explanation:"Side Kick Kneeling: kneeling on one knee, shoulder over wrist, fingers away from body, top leg at hip height."},
  {id:"m97",type:"mcq",level:"Advanced",theme:"Setup",exercise:"Side Bend",q:"What is the starting position for Side Bend?",options:["Lying on side flat","Sitting sideways, weight on one side of pelvis and supporting arm, legs bent, top leg in front of bottom leg","Kneeling sideways","Standing"],correct:1,explanation:"Side Bend: sitting sideways, weight on one side of pelvis and supporting arm, legs bent, top leg in front of bottom leg."},
  {id:"m98",type:"fill",level:"Advanced",theme:"Cues",exercise:"Side Bend",q:"In Side Bend, go with the ___ straight up, not with the shoulders.",answer:"pelvis",hint:"What lifts first",explanation:"'Go with the pelvis straight up, not with the shoulders' — the pelvis initiates the lift."},
  {id:"m99",type:"mcq",level:"Advanced",theme:"Cues",exercise:"Corkscrew Advanced",q:"In Corkscrew Advanced, what is the cue for the sitting bones?",options:["Lift them as high as possible","Tuck them under","Your sitting bones do not move","Spread them wide"],correct:2,explanation:"'Your sitting bones do not move' — the pelvis stays aligned as the legs circle."},
  {id:"m100",type:"mcq",level:"Advanced",theme:"Setup",exercise:"Hip Circles Prep",q:"What is the starting position for Hip Circles Prep?",options:["Lying supine","Sitting in V position, arms straight behind pelvis, fingers facing away from body, legs straight and together on diagonal, feet plantarflexed","Kneeling upright","Lying prone"],correct:1,explanation:"Hip Circles Prep: sitting in V position, arms straight behind pelvis, fingers facing away, legs on diagonal, feet plantarflexed."},
  {id:"m101",type:"mcq",level:"Advanced",theme:"Cues",exercise:"Push Up",q:"What is a key focus in Push Up regarding the scapulae?",options:["Let the shoulder blades wing out","Elevate the shoulder blades","Keep your shoulder blades still","Retract the shoulder blades forcefully"],correct:2,explanation:"'Keep your shoulder blades still' — scapular stability is essential during Push Up."},
  {id:"m102",type:"mcq",level:"Advanced",theme:"Cues",exercise:"Rocking",q:"What is the key cue for initiating the rock in Rocking?",options:["Use the head to go with momentum","Squeeze the glutes hard","Push the feet away into your hands and lift the knees toward the ceiling as you inhale","Tuck the chin"],correct:2,explanation:"'Push the feet away into your hands and lift the knees toward the ceiling as you inhale' — do not use the head."},
  {id:"m103",type:"mcq",level:"Advanced",theme:"Cues",exercise:"Jackknife",q:"In Jackknife, where do you reach the hamstrings and glutes?",options:["Toward the floor","Sideways","To the sky","Toward your face"],correct:2,explanation:"'Feet to the sky — reach the hamstrings and glutes to the sky.'"},
  {id:"m104",type:"mcq",level:"Advanced",theme:"Setup",exercise:"Control Balance",q:"What is the starting position for Control Balance?",options:["Lying supine, arms overhead","Starting in Roll Over position, feet dorsiflexed and anchored on mat, arms overhead, hands holding feet","Sitting upright","Lying prone"],correct:1,explanation:"Control Balance: starting in Roll Over position, feet dorsiflexed and anchored on mat, arms overhead, hands holding feet."},
// ── HAMSTRINGS PULL 1 ────────────────────────────────────────────────────────
  {id:"m105",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Hamstrings Pull 1",q:"What is the starting position for Hamstrings Pull 1?",options:["Lying supine, legs straight","Starting in Chest Lift position, legs together perpendicular to mat, hands behind calves","Sitting upright","Lying prone"],correct:1,explanation:"Hamstrings Pull 1: starting in Chest Lift position, legs together and perpendicular to the mat, hands behind the calves."},
  {id:"m106",type:"mcq",level:"Intermediate",theme:"Muscles",exercise:"Hamstrings Pull 1",q:"Which muscles do the pulse in Hamstrings Pull 1?",options:["The arms","The hamstrings","The hip flexors","The glutes"],correct:2,explanation:"The pulse comes from the hip flexors — not from the arms. The hands guide but the hip flexors contract."},
  {id:"m107",type:"tf",level:"Intermediate",theme:"Cues",exercise:"Hamstrings Pull 1",q:"In Hamstrings Pull 1, you bounce the legs to create momentum.",correct:false,explanation:"'We do not bounce the legs, we pull to move them further' — the pulse is controlled and comes from the hip flexors."},
  {id:"m108",type:"fill",level:"Intermediate",theme:"Cues",exercise:"Hamstrings Pull 1",q:"In Hamstrings Pull 1, the leg that is down needs to be pushed onto the ___.",answer:"floor",hint:"Grounding the lower leg",explanation:"'The leg that is down needs to be pushed onto the floor' — this stabilises the pelvis and increases the hamstring stretch."},

  // ── ROLL OVER ────────────────────────────────────────────────────────────────
  {id:"m109",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Roll Over",q:"What is the starting position for Roll Over?",options:["Sitting upright","Lying supine, arms by sides, legs straight and together, on a diagonal line (approximately 60 degrees), feet plantarflexed","Lying prone","Kneeling"],correct:1,explanation:"Roll Over: lying supine, arms by sides of body, legs straight and together, on a diagonal line at approximately 60 degrees, feet plantarflexed."},
  {id:"m110",type:"tf",level:"Intermediate",theme:"Cues",exercise:"Roll Over",q:"In Roll Over, you keep the feet in dorsiflexion until you come back to 90 degrees.",correct:true,explanation:"'Keep the feet in dorsiflexion until we come back to 90 degrees' — this maintains the stretch through the back of the legs."},
  {id:"m111",type:"fill",level:"Advanced",theme:"Cues",exercise:"Roll Over",q:"In Roll Over, bring your ___ to the ceiling.",answer:"sitbones",hint:"What reaches upward",explanation:"'Bring your sitbones to the ceiling' — this cue encourages the deep posterior tilt needed to roll over."},
  {id:"m112",type:"mcq",level:"Advanced",theme:"Breathing",exercise:"Roll Over",q:"In Roll Over, what is the breath on the way up?",options:["Inhale to 90 degrees, hold to roll over","Exhale throughout","Inhale to 90 degrees, exhale as you get a deep posterior tilt and roll over","Hold the breath"],correct:2,explanation:"'Inhale to 90 degrees, exhale as you get a deep posterior tilt' — the exhale drives the posterior tilt and the roll over."},
  {id:"m113",type:"tf",level:"Advanced",theme:"Cues",exercise:"Roll Over",q:"In Roll Over, you must not put pressure onto the head.",correct:true,explanation:"'Do not put pressure onto the head' — the weight should be on the shoulders and upper back, never on the cervical spine."},

  // ── SHOULDER BRIDGE PREP ─────────────────────────────────────────────────────
  {id:"m114",type:"fill",level:"Intermediate",theme:"Cues",exercise:"Shoulder Bridge Prep",q:"In Shoulder Bridge Prep, keep a deep posterior tilt — even more when the leg ___.",answer:"lowers",hint:"When the challenge increases",explanation:"'Keep a deep posterior tilt — even more when the leg lowers' — the posterior tilt must deepen to stabilise as the leg lowers."},
  {id:"m115",type:"tf",level:"Intermediate",theme:"Cues",exercise:"Shoulder Bridge Prep",q:"In Shoulder Bridge Prep, the pelvis must stay completely level when one leg lifts.",correct:true,explanation:"'Keep the hip aligned — square off your pelvis' — the pelvis must not drop or rotate when one leg moves."},
  {id:"m116",type:"mcq",level:"Intermediate",theme:"Muscles",exercise:"Shoulder Bridge Prep",q:"What is the primary challenge of Shoulder Bridge Prep?",options:["Hip flexor strength","Spinal articulation","Maintaining pelvic-lumbar stabilisation as one leg moves","Shoulder mobility"],correct:2,explanation:"The primary challenge is maintaining pelvic-lumbar stabilisation — keeping the pelvis level and stable as one leg lifts and lowers."},

  // ── SIDE KICK ────────────────────────────────────────────────────────────────
  {id:"m117",type:"fill",level:"Intermediate",theme:"Cues",exercise:"Side Kick",q:"In Side Kick, as we bring the leg to the front, fight the ___ pelvis tilt.",answer:"posterior",hint:"Direction to resist",explanation:"'As we bring the leg to the front, anterior pelvis tilt (fight the posterior pelvis tilt)' — the pelvis wants to tuck when the leg swings forward."},
  {id:"m118",type:"fill",level:"Intermediate",theme:"Cues",exercise:"Side Kick",q:"In Side Kick, the ___ are on top of each other.",answer:"ASIS",hint:"Bony landmarks at the front of the pelvis",explanation:"'ASIS are on top of each other' — the pelvis stays stacked throughout."},
  {id:"m119",type:"mcq",level:"Intermediate",theme:"Muscles",exercise:"Side Kick",q:"Which muscles hold the trunk lifted in Side Kick?",options:["Trapezius and rhomboids","Serratus anterior and obliques","Quadriceps and hamstrings","Hip flexors only"],correct:1,explanation:"'Use serratus anterior and obliques to hold the trunk' — these muscles keep the trunk lifted and stable throughout Side Kick."},

  // ── DOUBLE LEG KICK ──────────────────────────────────────────────────────────
  {id:"m120",type:"fill",level:"Intermediate",theme:"Cues",exercise:"Double Leg Kick",q:"In Double Leg Kick, keep the legs as ___ as possible.",answer:"narrow",hint:"Width of the legs",explanation:"'Keep the legs as narrow as possible' — the adductors work to keep the legs together throughout."},
  {id:"m121",type:"tf",level:"Intermediate",theme:"Cues",exercise:"Double Leg Kick",q:"In Double Leg Kick, the knees touch the floor throughout.",correct:false,explanation:"'The knees do not touch the floor and legs are active' — the legs are lifted off the mat throughout the exercise."},
  {id:"m122",type:"mcq",level:"Intermediate",theme:"Breathing",exercise:"Double Leg Kick",q:"What is the breath pattern for Double Leg Kick?",options:["Inhale for the kicks, exhale to lengthen","Exhale 3 times with 3 pulses, then inhale to kick 3 times and lengthen and lift","Hold throughout","Breathe naturally"],correct:1,explanation:"'Exhale 3 times with 3 pulses' — 3 exhale pulses for the kicks, then inhale to lengthen and lift."},

  // ── SWIMMING ─────────────────────────────────────────────────────────────────
  {id:"m123",type:"tf",level:"Intermediate",theme:"Cues",exercise:"Swimming",q:"In Swimming, the arms are not lower than the face.",correct:true,explanation:"'The arms are not lower than the face' — the arms stay at the same height as the head or higher throughout."},
  {id:"m124",type:"fill",level:"Intermediate",theme:"Cues",exercise:"Swimming",q:"In Swimming, avoid ___ of the torso.",answer:"rotation",hint:"What the torso must not do",explanation:"'Avoid rotation of the torso' — the alternating arm and leg movement should not cause the trunk to rotate."},
  {id:"m125",type:"mcq",level:"Intermediate",theme:"Muscles",exercise:"Swimming",q:"Which muscles are working in Swimming?",options:["Hip flexors and quadriceps only","Hip extensors (glutes and hamstrings) and back extensors","Abdominals and obliques only","Shoulder flexors only"],correct:1,explanation:"'Hip extensors are working (glutes and hamstrings) as well as the back extensors' — Swimming is primarily a back extension and hip extension exercise."},

  // ── ROCKING PREP ─────────────────────────────────────────────────────────────
  {id:"m126",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Rocking Prep",q:"What is the starting position for Rocking Prep?",options:["Lying prone, arms overhead","Lying prone, knees bent, arms straight reaching back, feet plantarflexed, hands holding feet","Kneeling upright","Lying supine"],correct:1,explanation:"Rocking Prep: lying prone, knees bent, arms straight reaching back, feet plantarflexed, hands holding feet."},
  {id:"m127",type:"mcq",level:"Intermediate",theme:"Muscles",exercise:"Rocking Prep",q:"Which muscles protect the lumbar spine in Rocking Prep?",options:["Erector spinae","The transversus abdominis — the deepest abdominals","Quadriceps","Hip flexors"],correct:1,explanation:"'The transversus abdominis (deepest abs) protects the lumbar spine' — core engagement is essential in Rocking Prep."},
  {id:"m128",type:"fill",level:"Intermediate",theme:"Cues",exercise:"Rocking Prep",q:"In Rocking Prep, press the ___ into the hands.",answer:"feet",hint:"Creating resistance",explanation:"'Press the feet into the hands' — this creates the tension needed and opens the hip flexors."},

  // ── LEG PULL FRONT ───────────────────────────────────────────────────────────
  {id:"m129",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Leg Pull Front",q:"What is the starting position for Leg Pull Front?",options:["Lying supine","Starting in Front Support (plank) position, one leg slightly lifted off mat, foot plantarflexed","Kneeling","Sitting upright"],correct:1,explanation:"Leg Pull Front: starting in Front Support (plank) position, one leg lifted slightly off the mat, foot plantarflexed."},
  {id:"m130",type:"mcq",level:"Intermediate",theme:"Muscles",exercise:"Leg Pull Front",q:"Which muscles do the work in Leg Pull Front?",options:["Hip flexors only","Quadriceps only","Glutes and hamstrings","Adductors"],correct:2,explanation:"'The glutes and hamstrings do the job' — the hip extensors lift the leg while the pelvis stays still."},
  {id:"m131",type:"tf",level:"Intermediate",theme:"Cues",exercise:"Leg Pull Front",q:"In Leg Pull Front, the lumbar spine moves as the leg lifts.",correct:false,explanation:"'The pelvis is still — the lumbars do not move' — the core stabilises completely as the hip extensors work."},

  // ── LEG PULL BACK ────────────────────────────────────────────────────────────
  {id:"m132",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Leg Pull Back",q:"What is the starting position for Leg Pull Back?",options:["Lying supine","Sitting upright","Starting in Back Support position","Lying prone"],correct:2,explanation:"Leg Pull Back: starting in Back Support position — body in a straight diagonal line, hands behind pelvis, fingers toward feet."},
  {id:"m133",type:"mcq",level:"Intermediate",theme:"Cues",exercise:"Leg Pull Back",q:"In Leg Pull Back, where does the pull come from?",options:["The arms","The hip extensors","The hip flexors","The quadriceps"],correct:2,explanation:"'The pull comes from the hip flexors' — as one leg lifts, the hip flexors of the lifting leg create the movement."},
  {id:"m134",type:"fill",level:"Intermediate",theme:"Cues",exercise:"Leg Pull Back",q:"In Leg Pull Back, the feet are parallel — they do not ___ or ___.",answer:"pronate / supinate",hint:"Two foot positions to avoid",explanation:"'The feet are parallel, they do not pronate or supinate' — neutral foot alignment is maintained throughout."},

  // ── HAMSTRINGS PULL 2 & 3 ────────────────────────────────────────────────────
  {id:"m135",type:"mcq",level:"Advanced",theme:"Setup",exercise:"Hamstrings Pull 2",q:"What is the starting position for Hamstrings Pull 2?",options:["Starting in Chest Lift position","Starting in Hamstrings Pull 1 position, fingers interlaced behind head","Lying supine, legs straight","Sitting upright"],correct:1,explanation:"Hamstrings Pull 2: starting in Hamstrings Pull 1 position, with fingers interlaced behind the head."},
  {id:"m136",type:"mcq",level:"Advanced",theme:"Breathing",exercise:"Hamstrings Pull 2",q:"In Hamstrings Pull 2, when do you inhale?",options:["As you hold the stretch","As the legs meet or switch","At the start","As you lower the legs"],correct:1,explanation:"'Inhale as the legs meet/switch' — the breath coordinates with the movement of the legs."},
  {id:"m137",type:"tf",level:"Advanced",theme:"Cues",exercise:"Hamstrings Pull 3",q:"In Hamstrings Pull 3, the torso pulses with the legs.",correct:false,explanation:"'No pulse with the torso — we pulse with the legs' — the trunk stays still as the legs do the work."},

  // ── SCISSORS ─────────────────────────────────────────────────────────────────
  {id:"m138",type:"mcq",level:"Advanced",theme:"Cues",exercise:"Scissors",q:"Where should the scissor movement happen in Scissors?",options:["Toward your face","Close to the body","As high as possible","Away from your face"],correct:3,explanation:"'You want the scissors movement to happen away from your face' — the legs scissor in front of the body, not close to the head."},
  {id:"m139",type:"fill",level:"Advanced",theme:"Cues",exercise:"Scissors",q:"In Scissors, to set up, bring your legs to tabletop and ___ them together.",answer:"squeeze",hint:"Creating tension before extending",explanation:"'Bring your legs to tabletop and squeeze them together' before stretching the legs out to 90 degrees."},
  {id:"m140",type:"mcq",level:"Advanced",theme:"Cues",exercise:"Scissors",q:"In Scissors, the elbows are:",options:["Wide and open","Stretched forward","Quite tight in","Behind the head"],correct:2,explanation:"'Your elbows are quite tight in' — the elbows stay close to the body, not wide."},

  // ── BICYCLE ──────────────────────────────────────────────────────────────────
  {id:"m141",type:"mcq",level:"Advanced",theme:"Cues",exercise:"Bicycle",q:"In Bicycle, what must you avoid as the legs reach toward the ground?",options:["Pointing the feet","Bending the knees","Anterior pelvic tilt","Plantar flexion"],correct:2,explanation:"'You want to reach like you are going to touch the ground, without the anterior pelvis tilt' — the pelvis stays stable as the legs extend toward the mat."},
  {id:"m142",type:"mcq",level:"Advanced",theme:"Setup",exercise:"Bicycle",q:"What movement pattern does Bicycle use?",options:["Both legs circle together","Legs go overhead and down in a rolling pattern while pedalling","Legs kick front and back alternately","Legs lift and lower one at a time"],correct:1,explanation:"Bicycle: legs go overhead and are down and roll back, reaching toward the ground like a cycling motion — without anterior pelvic tilt."},

  // ── CORKSCREW ADVANCED ───────────────────────────────────────────────────────
  {id:"m143",type:"fill",level:"Advanced",theme:"Cues",exercise:"Corkscrew Advanced",q:"In Corkscrew Advanced, rotate around the ___ .",answer:"spine",hint:"The central axis",explanation:"'Rotate around the spine' — the rotation is around the spinal axis, keeping the pelvis aligned with the ribs."},
  {id:"m144",type:"tf",level:"Advanced",theme:"Cues",exercise:"Corkscrew Advanced",q:"In Corkscrew Advanced, you swipe the floor with your feet.",correct:true,explanation:"'Swipe the floor with your feet' when in the rollover position — the feet brush the mat as the legs circle."},
  {id:"m145",type:"mcq",level:"Advanced",theme:"Cues",exercise:"Corkscrew Advanced",q:"In Corkscrew Advanced, what must not move away from the line?",options:["The arms","The head","The pelvis","The feet"],correct:2,explanation:"'Do not move the pelvis away from the line — the pelvis is in line with your ribs' — alignment is maintained throughout the circle."},

  // ── TEASER 2 ─────────────────────────────────────────────────────────────────
  {id:"m146",type:"mcq",level:"Advanced",theme:"Cues",exercise:"Teaser 2",q:"What is the key focus in Teaser 2?",options:["Moving the torso as far as possible","Moving the legs as much as you can while keeping the torso stable","Holding the position for as long as possible","Breathing into the belly"],correct:1,explanation:"'Move your legs as much as you can, keep your torso stable' — Teaser 2 adds leg movement while the trunk stays in the V position."},

  // ── TEASER 3 ─────────────────────────────────────────────────────────────────
  {id:"m147",type:"mcq",level:"Advanced",theme:"Cues",exercise:"Teaser 3",q:"In Teaser 3, what do the legs do?",options:["Stay still","Kick one at a time","Hover over the floor","Circle around"],correct:2,explanation:"'Hover the legs over the floor' — in Teaser 3 the legs lower toward the floor while the trunk stays in position, requiring maximum abdominal control."},

  // ── HIP CIRCLES ──────────────────────────────────────────────────────────────
  {id:"m148",type:"mcq",level:"Advanced",theme:"Cues",exercise:"Hip Circles",q:"In Hip Circles, the ribs move the arms and the head — and the pelvis goes in which direction?",options:["The same direction as the ribs","Stays completely still","The opposite direction to the ribs","Drops toward the mat"],correct:2,explanation:"'The ribs go to one direction and the pelvis goes to the other direction' — the opposition creates the circular motion."},
  {id:"m149",type:"fill",level:"Advanced",theme:"Cues",exercise:"Hip Circles",q:"In Hip Circles, perform ___ circles per direction.",answer:"5",hint:"Number of repetitions",explanation:"'5 to one direction, 5 to the other direction' — equal circles on both sides."},

  // ── TWIST ─────────────────────────────────────────────────────────────────────
  {id:"m150",type:"mcq",level:"Advanced",theme:"Cues",exercise:"Twist",q:"In Twist, where is the weight placed?",options:["Into your back leg","Into your front leg","Equally on both legs","On the hands"],correct:1,explanation:"'Put the weight into your front leg' — the front leg supports the body as the twist occurs."},
  {id:"m151",type:"tf",level:"Advanced",theme:"Cues",exercise:"Twist",q:"In Twist, we aim to have a curved back.",correct:false,explanation:"'We aim to have a flat back' — the spine stays long and flat, not curved, during the Twist."},
  {id:"m152",type:"fill",level:"Advanced",theme:"Cues",exercise:"Twist",q:"In Twist, make sure your hips are ___.",answer:"squared",hint:"Alignment of the hips",explanation:"'Make sure your hips are squared' — the pelvis stays aligned and does not rotate with the movement."},

  // ── SWAN DIVE ─────────────────────────────────────────────────────────────────
  {id:"m153",type:"mcq",level:"Advanced",theme:"Cues",exercise:"Swan Dive",q:"What is the key transition in Swan Dive?",options:["From the extension, drop the head first","From the extension, bring your hands to your forehead then extend up","Push off the mat with the hands","Tuck and roll forward"],correct:1,explanation:"'From the extension, bring your hands to your forehead then extend up' — this transition creates the rocking movement of Swan Dive."},

  // ── SWAN DIVE PREP WITH CATCH ─────────────────────────────────────────────────
  {id:"m154",type:"mcq",level:"Advanced",theme:"Cues",exercise:"Swan Dive Prep with Catch",q:"In Swan Dive Prep with Catch, how do the legs move?",options:["Kick as high as possible","Do not move","Go as high as they can without kicking them","Only one leg lifts"],correct:2,explanation:"'The legs go as high as we can but without kicking them' — the hip extensors lift the legs with control, not momentum."},

  // ── BOOMERANG ─────────────────────────────────────────────────────────────────
  {id:"m155",type:"mcq",level:"Advanced",theme:"Cues",exercise:"Boomerang",q:"What initiates the movement in Boomerang?",options:["Pressing the hands into the mat","Kicking the legs over","Imprinting the lower back onto the floor and lifting the legs","Tucking the chin"],correct:2,explanation:"'Imprint your lower back onto the floor and lift the legs' — the deep posterior tilt and core engagement initiate the Boomerang."},

  // ── CRAB ─────────────────────────────────────────────────────────────────────
  {id:"m156",type:"mcq",level:"Advanced",theme:"Cues",exercise:"Crab",q:"In Crab, when you find your C-curve, what do you add?",options:["A straight back","Only a light pressure onto your head and hold your feet","Maximum pressure on the head","Both hands behind the neck"],correct:1,explanation:"'When you find your C-curve, add only a light pressure onto your head and hold your feet' — the pressure on the head is minimal, not forceful."},
  {id:"m157",type:"tf",level:"Advanced",theme:"Cues",exercise:"Crab",q:"In Crab, you apply heavy pressure onto the head.",correct:false,explanation:"'Add only a LIGHT pressure onto your head' — Crab uses minimal head pressure. Heavy pressure on the cervical spine is contraindicated."},

  // ── GLUTEALS SIDE LYING SERIES ────────────────────────────────────────────────
  {id:"m158",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Gluteals Side Lying — Side Leg Lift",q:"What is the leg position in Gluteals Side Lying — Side Leg Lift?",options:["Both legs straight","The bottom leg is bent to 90 degrees, the upper foot is soft and the ankle drops toward the mat","Both legs in tabletop","One leg straight up, one bent"],correct:1,explanation:"Side Leg Lift: the bottom leg is bent to 90 degrees, the upper foot is soft and the ankle drops toward the mat. Officially performed with ankle weights."},
  {id:"m159",type:"tf",level:"Intermediate",theme:"Cues",exercise:"Gluteals Side Lying — Side Leg Lift",q:"In Gluteals Side Lying — Side Leg Lift, the pelvis moves as the leg lifts.",correct:false,explanation:"'The pelvis is in neutral and does not move' — the glutes lift the leg while the pelvis stays completely still."},
  {id:"m160",type:"fill",level:"Intermediate",theme:"Cues",exercise:"Gluteals Side Lying — Side Leg Lift",q:"In Gluteals Side Lying — Side Leg Lift, let the ___ work for your upper foot.",answer:"gravity",hint:"A natural force",explanation:"'Let the gravity work for your upper foot' — the ankle drops naturally toward the mat due to gravity."},
  {id:"m161",type:"mcq",level:"Intermediate",theme:"Cues",exercise:"Gluteals Side Lying — Forward and Lift",q:"Which muscles stabilise the movement in Gluteals Side Lying — Forward and Lift?",options:["Hip flexors and quadriceps","The obliques","Back extensors","Shoulder muscles"],correct:1,explanation:"'The obliques stabilise the movement' — the obliques keep the trunk stable as the leg moves forward and lifts."},
  {id:"m162",type:"tf",level:"Intermediate",theme:"Cues",exercise:"Gluteals Side Lying — Forward and Lift",q:"In Gluteals Side Lying — Forward and Lift, you maintain neutral pelvis.",correct:true,explanation:"'Keep neutral pelvis' — the pelvis does not rotate or tilt as the leg moves."},
  {id:"m163",type:"mcq",level:"Intermediate",theme:"Cues",exercise:"Gluteals Side Lying — Hip Extension Bent Knee",q:"In Gluteals Side Lying — Hip Extension Bent Knee, what do the abdominals prevent?",options:["The leg lifting too high","Dropping the lumbar spine (lower back)","The pelvis from elevating","The knee from bending"],correct:1,explanation:"'Use your abdominals not to drop the lumbar spine' — the abdominals stabilise and prevent the lower back from dropping as the hip extends."},
  {id:"m164",type:"tf",level:"Intermediate",theme:"Cues",exercise:"Gluteals Side Lying — Hip Extension Bent Knee",q:"In Gluteals Side Lying — Hip Extension Bent Knee, squared hips are maintained.",correct:true,explanation:"'Keep squared hips' — the pelvis stays neutral and the hips do not rotate as the leg extends back."},

  // ── GLUTEALS KNEELING SERIES ──────────────────────────────────────────────────
  {id:"m165",type:"mcq",level:"Intermediate",theme:"Cues",exercise:"Gluteals Kneeling — Hip Abduction Bent Knee",q:"What is the key cue for the pelvis in Gluteals Kneeling — Hip Abduction Bent Knee?",options:["Let the pelvis rotate","Drop the skull toward the mat","Do not move the pelvis","Tuck the pelvis under"],correct:2,explanation:"'Do not move the pelvis' — the pelvis stays completely stable as the hip abducts. A common error is letting the pelvis hike up."},
  {id:"m166",type:"tf",level:"Intermediate",theme:"Cues",exercise:"Gluteals Kneeling — Hip Abduction Bent Knee",q:"In Gluteals Kneeling — Hip Abduction Bent Knee, you should drop the skull.",correct:false,explanation:"'Do not drop the skull' — the head stays aligned with the spine. Dropping the skull creates unnecessary tension."},
  {id:"m167",type:"mcq",level:"Intermediate",theme:"Cues",exercise:"Gluteals Kneeling — Hip Extension Straight Leg",q:"In Gluteals Kneeling — Hip Extension Straight Leg, what is the priority?",options:["How high the leg goes","Control — it is not about how high the leg goes","How fast the leg moves","How long you hold the position"],correct:1,explanation:"'It is not about how high the leg goes, it is about control' — the ASIS must stay aligned and the pelvis must not drop."},
  {id:"m168",type:"fill",level:"Intermediate",theme:"Cues",exercise:"Gluteals Kneeling — Hip Extension Straight Leg",q:"In Gluteals Kneeling — Hip Extension Straight Leg, the ___ need to be aligned (we tend to drop the pelvis).",answer:"ASIS",hint:"Bony landmarks at the front of the pelvis",explanation:"'The ASIS need to be aligned' — keeping the ASIS level prevents the pelvis from dropping on the working side."},

  // ── MAGIC CIRCLE — ARMS SERIES ────────────────────────────────────────────────
  {id:"m169",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Magic Circle — Arms Series",q:"How can the Magic Circle Arms Series be performed?",options:["Only lying down","Only standing","Standing or kneeling","Only seated"],correct:2,explanation:"'We can do the arm series standing or kneeling' — both positions are valid for the Magic Circle Arms Series."},
  {id:"m170",type:"fill",level:"Intermediate",theme:"Cues",exercise:"Magic Circle — Arms Series",q:"In Magic Circle Arms Series, perform ___ reps per side.",answer:"10",hint:"Number of repetitions",explanation:"'10 reps per side' — equal work on both sides."},

  // ── MAGIC CIRCLE — SITTING SERIES ─────────────────────────────────────────────
  {id:"m171",type:"mcq",level:"Intermediate",theme:"Cues",exercise:"Magic Circle — Ankles Sitting",q:"In Magic Circle — Ankles Sitting, what do you want to bring together?",options:["The knees together","The ankles together without bringing the knees together","The feet flat on the floor","The thighs together"],correct:1,explanation:"'We want to bring the ankles together, but NOT bring the knees together' — the work is in the feet and lower leg, not the knees."},
  {id:"m172",type:"fill",level:"Intermediate",theme:"Cues",exercise:"Magic Circle — Ankles Sitting",q:"In Magic Circle — Ankles Sitting, engage the muscles of the ___.",answer:"feet",hint:"The lowest part of the leg",explanation:"'Engage the muscles of the feet' — the feet actively press into the magic circle."},

  // ── MAGIC CIRCLE — SUPINE SERIES ──────────────────────────────────────────────
  {id:"m173",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Magic Circle — Adductor Squeeze Supine",q:"In Magic Circle — Adductor Squeeze Supine, where is the magic circle placed?",options:["Between the ankles","Between the knees — not on the knee itself","Below the knees","At the shins"],correct:1,explanation:"'Magic circle above the knee, not on the knee itself' — the ring sits on the thighs just above the knees."},
  {id:"m174",type:"mcq",level:"Intermediate",theme:"Cues",exercise:"Magic Circle — Adductor Squeeze Supine",q:"In Magic Circle — Adductor Squeeze Supine, the squeeze comes from which muscles?",options:["The glutes","The hamstrings","The adductors — do not go through the butt","The hip flexors"],correct:2,explanation:"'Do not go through the butt, squeeze the legs with adductors' — the work is purely adductor, not gluteal."},
  {id:"m175",type:"tf",level:"Intermediate",theme:"Cues",exercise:"Magic Circle — Adductor Squeeze Supine",q:"In Magic Circle — Adductor Squeeze Supine, the pelvis is neutral.",correct:true,explanation:"'Pelvis is neutral' — the pelvis stays in neutral throughout the adductor squeeze."},
  {id:"m176",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Magic Circle — Knees Supine",q:"What is the leg position for Magic Circle — Knees Supine?",options:["Legs straight","Legs in tabletop — squeeze and release","Legs wide apart","One leg bent, one straight"],correct:1,explanation:"'Legs are in tabletop' — the magic circle is between the knees in tabletop position. Squeeze and release."},
  {id:"m177",type:"mcq",level:"Intermediate",theme:"Muscles",exercise:"Magic Circle — Knees Supine",q:"Which muscles are emphasised in Magic Circle — Knees Supine?",options:["Hip extensors only","A lot of adductor work and core work","Shoulder stability","Hip flexors only"],correct:1,explanation:"'You use a lot of adductor work and core work' — both the adductors and the core are challenged in this position."},

  // ── MAGIC CIRCLE — PRONE SERIES ───────────────────────────────────────────────
  {id:"m178",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Magic Circle — Ankles Bent Knees Prone",q:"In Magic Circle — Ankles Bent Knees Prone, where does the ring start?",options:["Between the thighs","Between the ankles, then go to your belly","Under the hips","On the lower back"],correct:1,explanation:"'Start with the ring between the ankles and go to your belly' — you set up with the ring between the ankles then lie prone."},
  {id:"m179",type:"mcq",level:"Intermediate",theme:"Cues",exercise:"Magic Circle — Ankles Bent Knees Prone",q:"In Magic Circle — Ankles Bent Knees Prone, the knees are:",options:["Touching the mat","Pressed wide apart","Lifted off the ground","Fully extended"],correct:2,explanation:"'Hip extension, the knees are off the ground' — the hip extensors lift the knees while the ring creates adduction resistance."},
  {id:"m180",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Magic Circle — Hamstrings Prone",q:"In Magic Circle — Hamstrings Prone, where is the magic circle placed?",options:["Between the knees","Under the butt","Between the ankles","At the shins"],correct:1,explanation:"'The magic circle goes under the butt' — the ring is placed under the glutes in the prone hamstrings series."},
  {id:"m181",type:"tf",level:"Intermediate",theme:"Cues",exercise:"Magic Circle — Hamstrings Prone",q:"In Magic Circle — Hamstrings Prone, you want to avoid lifting the legs or having the butt come up.",correct:true,explanation:"'We want to avoid lifting the legs or having the butt come up' — the pelvis stays grounded and the focus is on the hamstrings."},

  // ── MAGIC CIRCLE — SWAN SERIES ────────────────────────────────────────────────
  {id:"m182",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Magic Circle — Swan 1",q:"In Magic Circle — Swan 1, what position is the magic circle in?",options:["Vertical","Between the knees","Horizontal — lifted with open palms","Behind the back"],correct:2,explanation:"'The magic circle is horizontal — lift it with open palms' — the ring is held horizontally in front of the body in Swan 1."},
  {id:"m183",type:"tf",level:"Intermediate",theme:"Cues",exercise:"Magic Circle — Swan 1",q:"In Magic Circle — Swan 1, you squeeze the glutes and hamstrings.",correct:false,explanation:"'We do not squeeze the glutes and hamstrings' — Swan 1 focuses on back extension and the magic circle arm work, not gluteal engagement."},
  {id:"m184",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Magic Circle — Swan 2",q:"In Magic Circle — Swan 2, the magic circle is:",options:["Horizontal","Horizontal above the head","Vertical","Behind the back"],correct:2,explanation:"'The magic circle is vertical' in Swan 2 — as opposed to horizontal in Swan 1."},

  // ── MAGIC CIRCLE — CHEST LIFT ────────────────────────────────────────────────
  {id:"m185",type:"mcq",level:"Intermediate",theme:"Setup",exercise:"Magic Circle — Chest Lift",q:"How many magic circles are used in Magic Circle — Chest Lift?",options:["One between the knees","Two — one between the knees and one in the hands with palms open","One in the hands only","Three"],correct:1,explanation:"'We use 2 magic circles — 1 between the knees and 1 in the hands with palms open' — double circle engagement."},
  {id:"m186",type:"tf",level:"Intermediate",theme:"Cues",exercise:"Magic Circle — Chest Lift",q:"In Magic Circle — Chest Lift, all the principles of regular Chest Lift apply.",correct:true,explanation:"'Everything we know about chest lift applies' — the same cues, breathing, and muscle focus apply, with the added challenge of the magic circles."},
  {id:"m187",type:"fill",level:"Intermediate",theme:"Cues",exercise:"Magic Circle — Chest Lift",q:"In Magic Circle — Chest Lift, press ___ and gradually ___.",answer:"gradually / decrease",hint:"Building and releasing the pressure",explanation:"'Press gradually and gradually decrease' — the pressure builds and releases with control, not suddenly."},
];

const SECTIONS = {
  history:{ label:"History & Principles", color:C.gold, emoji:"📜", desc:"Joseph Pilates, principles, pelvis, breathing" },
  anatomy:{ label:"Anatomy", color:C.sageDark, emoji:"🦴", desc:"Planes, joints, muscles, movement terms" },
  mat:{ label:"Mat Exercises", color:C.accent, emoji:"🧘", desc:"Setup, cues, breathing, muscles, modifications" },
};

const HISTORY_TOPICS = ["All","Joseph Pilates","The 10 Principles","Pelvis & Neutral Spine","Breathing"];
const ANATOMY_TOPICS = ["All","Planes & Directions","Joints","Joint Movements","Muscles by Region","Posture","Muscle Types & Contractions"];
const MAT_THEMES = ["All","Setup","Breathing","Cues","Muscles","Modifications"];
const MAT_LEVELS = ["All","Beginner","Intermediate","Advanced"];
const DIFF_LEVELS = ["All","Beginner","Intermediate","Advanced"];
const DIFF_COLORS = { Beginner:C.right, Intermediate:C.gold, Advanced:C.wrong };

function shuffle(arr){ return [...arr].sort(()=>Math.random()-0.5); }

function Header(){
  return(
    <div style={{padding:"18px 24px 14px",borderBottom:`1px solid ${C.sageLight}`,display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
      <span style={{fontFamily:"Georgia,serif",fontStyle:"italic",fontSize:"0.95rem",color:C.sageDark,letterSpacing:"0.04em"}}>My Movement Lab</span>
      <span style={{fontSize:"0.55rem",letterSpacing:"0.18em",textTransform:"uppercase",color:C.accent,fontFamily:"sans-serif",fontWeight:300}}>Pilates Study Tool</span>
    </div>
  );
}

function SLabel({children}){
  return <p style={{fontSize:"0.56rem",letterSpacing:"0.18em",textTransform:"uppercase",color:C.accent,fontFamily:"sans-serif",fontWeight:300,marginBottom:7}}>{children}</p>;
}

function Pill({label,active,color,onClick}){
  return(
    <button onClick={onClick} style={{padding:"5px 12px",border:`1px solid ${active?(color||C.forest):C.sageLight}`,background:active?(color||C.forest):"transparent",cursor:"pointer",fontFamily:"sans-serif",fontWeight:300,fontSize:"0.6rem",letterSpacing:"0.1em",textTransform:"uppercase",color:active?C.cream:C.forest,transition:"all 0.18s"}}>{label}</button>
  );
}

function Btn({children,onClick,variant="primary",disabled,style={}}){
  const base={border:"none",cursor:disabled?"not-allowed":"pointer",fontFamily:"sans-serif",fontWeight:300,fontSize:"0.66rem",letterSpacing:"0.16em",textTransform:"uppercase",padding:"11px 26px",transition:"all 0.18s",opacity:disabled?0.4:1};
  const v={primary:{background:C.forest,color:C.cream},ghost:{background:"transparent",color:C.forest,border:`1px solid ${C.sageLight}`},sage:{background:C.sageDark,color:C.cream}};
  return <button onClick={disabled?undefined:onClick} style={{...base,...v[variant],...style}}>{children}</button>;
}

function MCQ({q,onAnswer,answered,selected}){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {q.options.map((opt,i)=>{
        let bc=C.sageLight,bg="transparent",col=C.forest;
        if(answered){if(i===q.correct){bc=C.right;bg="rgba(106,155,122,0.12)";col=C.right;}else if(i===selected){bc=C.wrong;bg="rgba(193,122,111,0.1)";col=C.wrong;}}
        return <button key={i} onClick={()=>!answered&&onAnswer(i)} disabled={answered} style={{border:`1px solid ${bc}`,background:bg,color:col,padding:"12px 14px",textAlign:"left",cursor:answered?"default":"pointer",fontFamily:"sans-serif",fontWeight:300,fontSize:"0.76rem",transition:"all 0.18s"}}>{opt}</button>;
      })}
    </div>
  );
}

function TF({q,onAnswer,answered,selected}){
  return(
    <div style={{display:"flex",gap:10}}>
      {[true,false].map(val=>{
        let bc=C.sageLight,bg="transparent",col=C.forest;
        if(answered){if(val===q.correct){bc=C.right;bg="rgba(106,155,122,0.12)";col=C.right;}else if(val===selected){bc=C.wrong;bg="rgba(193,122,111,0.1)";col=C.wrong;}}
        return <button key={String(val)} onClick={()=>!answered&&onAnswer(val)} disabled={answered} style={{flex:1,border:`1px solid ${bc}`,background:bg,color:col,padding:"16px",cursor:answered?"default":"pointer",fontFamily:"Georgia,serif",fontStyle:"italic",fontSize:"1rem",transition:"all 0.18s"}}>{val?"True":"False"}</button>;
      })}
    </div>
  );
}

function Flashcard({q,onAnswer,answered}){
  const [flipped,setFlipped]=useState(false);
  return(
    <div>
      <div onClick={()=>setFlipped(f=>!f)} style={{border:`1px solid ${flipped?C.sageDark:C.sageLight}`,background:flipped?"rgba(90,110,88,0.06)":"transparent",padding:"24px 20px",cursor:"pointer",minHeight:100,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.25s",marginBottom:12}}>
        <p style={{fontFamily:"Georgia,serif",fontStyle:"italic",textAlign:"center",fontSize:flipped?"0.85rem":"0.95rem",lineHeight:1.65,color:C.forest}}>{flipped?q.answer:"Tap to reveal the answer →"}</p>
      </div>
      {!answered&&flipped&&(
        <div style={{display:"flex",gap:9}}>
          <Btn onClick={()=>onAnswer(false)} variant="ghost" style={{flex:1}}>Didn't know it</Btn>
          <Btn onClick={()=>onAnswer(true)} variant="sage" style={{flex:1}}>Got it ✓</Btn>
        </div>
      )}
    </div>
  );
}

function Fill({q,onAnswer,answered,input,setInput}){
  return(
    <div>
      {q.hint&&<p style={{fontSize:"0.62rem",color:C.accent,fontFamily:"sans-serif",fontWeight:300,letterSpacing:"0.08em",marginBottom:8}}>Hint: {q.hint}</p>}
      <input disabled={answered} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!answered&&input.trim()&&onAnswer(input)} placeholder="Type your answer…" style={{width:"100%",padding:"12px 13px",border:`1px solid ${C.sageLight}`,background:"transparent",fontFamily:"sans-serif",fontWeight:300,fontSize:"0.76rem",color:C.forest,outline:"none",marginBottom:9,boxSizing:"border-box"}}/>
      {!answered&&<Btn onClick={()=>input.trim()&&onAnswer(input)} disabled={!input.trim()}>Check →</Btn>}
      {answered&&<div style={{padding:"10px 13px",border:`1px solid ${C.right}`,background:"rgba(106,155,122,0.1)",fontSize:"0.72rem",color:C.right,fontFamily:"sans-serif",fontWeight:300,marginTop:7}}>✓ Model answer: {q.answer}</div>}
    </div>
  );
}

function Sequence({q,onAnswer,answered}){
  const [order,setOrder]=useState([...Array(q.items.length).keys()]);
  const [selected,setSelected]=useState(null);
  function swap(i,j){const o=[...order];[o[i],o[j]]=[o[j],o[i]];setOrder(o);}
  function check(){const correct=q.correct.every((v,i)=>v===order[i]);onAnswer(correct);}
  return(
    <div>
      <p style={{fontSize:"0.65rem",color:C.accent,fontFamily:"sans-serif",fontWeight:300,marginBottom:10}}>Tap two items to swap their order, then check.</p>
      {order.map((itemIdx,pos)=>(
        <button key={pos} onClick={()=>{if(answered)return;if(selected===null){setSelected(pos);}else{swap(selected,pos);setSelected(null);}}} disabled={answered} style={{display:"block",width:"100%",marginBottom:7,padding:"11px 14px",textAlign:"left",border:`1px solid ${selected===pos?C.sageDark:C.sageLight}`,background:selected===pos?"rgba(90,110,88,0.08)":"transparent",cursor:answered?"default":"pointer",fontFamily:"sans-serif",fontWeight:300,fontSize:"0.75rem",color:C.forest,transition:"all 0.18s"}}>
          <span style={{color:C.accent,marginRight:8}}>{pos+1}.</span>{q.items[itemIdx]}
        </button>
      ))}
      {!answered&&<Btn onClick={check} style={{marginTop:6}}>Check order →</Btn>}
    </div>
  );
}

function ErrorDetect({q,onAnswer,answered}){
  const [revealed,setRevealed]=useState(false);
  return(
    <div>
      {!revealed&&!answered&&<Btn onClick={()=>{setRevealed(true);onAnswer(true);}}>Reveal answer →</Btn>}
      {(revealed||answered)&&(
        <div style={{padding:"14px 16px",borderLeft:`2px solid ${C.wrong}`,background:"rgba(193,122,111,0.06)",fontSize:"0.75rem",lineHeight:1.75,color:C.forest,fontFamily:"sans-serif",fontWeight:300}}>
          <span style={{color:C.wrong,fontWeight:400,display:"block",marginBottom:6}}>✗ What's wrong:</span>
          {q.answer}
        </div>
      )}
    </div>
  );
}

function Scenario({q,onAnswer,answered}){
  const [revealed,setRevealed]=useState(false);
  return(
    <div>
      {!revealed&&!answered&&<Btn onClick={()=>{setRevealed(true);onAnswer(true);}}>Show suggested response →</Btn>}
      {(revealed||answered)&&(
        <div style={{padding:"14px 16px",borderLeft:`2px solid ${C.sageDark}`,background:"rgba(90,110,88,0.06)",fontSize:"0.75rem",lineHeight:1.75,color:C.forest,fontFamily:"sans-serif",fontWeight:300}}>
          <span style={{color:C.sageDark,fontWeight:400,display:"block",marginBottom:6}}>Suggested response:</span>
          {q.answer}
        </div>
      )}
    </div>
  );
}

function Paywall({onUnlock}){
  const [code,setCode]=useState("");
  const [error,setError]=useState(false);
  function tryCode(){
    if(code.trim().toLowerCase()===ACCESS_CODE.toLowerCase()){onUnlock();}
    else{setError(true);setTimeout(()=>setError(false),2000);}
  }
  return(
    <div style={{maxWidth:480,margin:"0 auto",padding:"52px 24px 40px",textAlign:"center"}}>
      <p style={{fontSize:"0.58rem",letterSpacing:"0.2em",textTransform:"uppercase",color:C.accent,fontFamily:"sans-serif",fontWeight:300,marginBottom:14}}>Free preview complete</p>
      <h2 style={{fontFamily:"Georgia,serif",fontStyle:"italic",fontWeight:300,fontSize:"clamp(1.7rem,5vw,2.4rem)",color:C.forest,margin:"0 0 16px",lineHeight:1.2}}>Keep going.<br/><span style={{color:C.sageDark}}>Unlock everything.</span></h2>
      <p style={{fontSize:"0.73rem",lineHeight:1.85,color:C.sageDark,marginBottom:20,fontFamily:"sans-serif",fontWeight:300}}>You've completed your 10 free questions. The full tool includes 400+ questions across all sections and formats.</p>
      <div style={{border:`1px solid ${C.sageLight}`,padding:"18px",marginBottom:24,textAlign:"left"}}>
        {["History & Principles — all topics & formats","Anatomy — planes, joints, muscles, posture, contractions","Mat Exercises — all exercises: setup, cues, breathing, muscles, modifications","All formats: MCQ, True/False, Fill in the blank, Flashcard, Sequencing, Error detection, Scenario"].map(f=>(
          <p key={f} style={{fontSize:"0.7rem",color:C.forest,fontFamily:"sans-serif",fontWeight:300,padding:"4px 0",borderBottom:`1px solid ${C.sageLight}`}}>✦ {f}</p>
        ))}
      </div>
      <p style={{fontSize:"0.65rem",color:C.forest,fontFamily:"sans-serif",fontWeight:300,marginBottom:10}}>Already have an access code?</p>
      <div style={{display:"flex",gap:8,marginBottom:6,justifyContent:"center"}}>
        <input value={code} onChange={e=>setCode(e.target.value)} onKeyDown={e=>e.key==="Enter"&&tryCode()} placeholder="Enter your code" style={{padding:"10px 13px",border:`1px solid ${error?C.wrong:C.sageLight}`,background:"transparent",fontFamily:"sans-serif",fontWeight:300,fontSize:"0.75rem",color:C.forest,outline:"none",width:180}}/>
        <Btn onClick={tryCode}>Unlock →</Btn>
      </div>
      {error&&<p style={{fontSize:"0.62rem",color:C.wrong,fontFamily:"sans-serif",fontWeight:300,marginBottom:8}}>Invalid code — try again.</p>}
      <p style={{fontSize:"0.6rem",color:C.accent,fontFamily:"sans-serif",fontWeight:300,marginTop:20}}>
        No code yet? Full access — €19 one-time payment.<br/>
        Contact <span style={{color:C.sageDark}}>@mymovementlab</span> on Instagram to purchase.
      </p>
    </div>
  );
}

function About({onBack}){
  return(
    <div style={{maxWidth:560,margin:"0 auto",padding:"40px 24px 60px"}}>
      <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"sans-serif",fontWeight:300,fontSize:"0.62rem",letterSpacing:"0.14em",textTransform:"uppercase",color:C.accent,marginBottom:32,padding:0}}>← Back</button>
      <p style={{fontSize:"0.56rem",letterSpacing:"0.18em",textTransform:"uppercase",color:C.accent,fontFamily:"sans-serif",fontWeight:300,marginBottom:10}}>About</p>
      <h2 style={{fontFamily:"Georgia,serif",fontStyle:"italic",fontWeight:300,fontSize:"clamp(1.6rem,4vw,2.2rem)",color:C.forest,margin:"0 0 20px",lineHeight:1.2}}>My Movement Lab</h2>
      <p style={{fontSize:"0.78rem",lineHeight:1.9,color:C.forest,fontFamily:"sans-serif",fontWeight:300,marginBottom:32}}>
        <em>My Movement Lab</em> is an independent movement study platform created by a Barre instructor and Pilates teacher trainee based in Amsterdam. This tool was built for students and trainees who want to build confidence in their knowledge — covering anatomy, principles, and exercise cues through varied formats including flashcards, multiple choice, fill in the blank, and more. Spaced repetition and format variety help content stick, whether you're deepening your understanding or preparing to start teaching.
      </p>
      <div style={{borderTop:`1px solid ${C.sageLight}`,paddingTop:24,marginBottom:32}}>
        <p style={{fontSize:"0.56rem",letterSpacing:"0.18em",textTransform:"uppercase",color:C.accent,fontFamily:"sans-serif",fontWeight:300,marginBottom:12}}>How it works</p>
        <p style={{fontSize:"0.76rem",lineHeight:1.85,color:C.forest,fontFamily:"sans-serif",fontWeight:300}}>
          The first 10 questions of each session are free. Full access — including all sections, all exercises, and all question formats — is available as a one-time purchase of €19. Once purchased, you will receive a personal access code by direct message.
        </p>
      </div>
      <div style={{borderTop:`1px solid ${C.sageLight}`,paddingTop:24,marginBottom:32}}>
        <p style={{fontSize:"0.56rem",letterSpacing:"0.18em",textTransform:"uppercase",color:C.accent,fontFamily:"sans-serif",fontWeight:300,marginBottom:12}}>Legal & Disclaimer</p>
        <p style={{fontSize:"0.72rem",lineHeight:1.9,color:C.forest,fontFamily:"sans-serif",fontWeight:300,marginBottom:12}}>
          This tool is an independent study resource created for personal educational use only. It is not affiliated with, endorsed by, or associated with any Pilates certification body, organisation, or institution. All content has been independently developed and reformulated for study purposes. It does not reproduce, represent, or claim to be the official curriculum or materials of any third party.
        </p>
        <p style={{fontSize:"0.72rem",lineHeight:1.9,color:C.forest,fontFamily:"sans-serif",fontWeight:300}}>
          The content in this tool is intended to support personal revision only and is not a substitute for formal teacher training or certified instruction. My Movement Lab accepts no liability for any use of this content in a professional, instructional, or clinical context.
        </p>
      </div>
      <div style={{borderTop:`1px solid ${C.sageLight}`,paddingTop:24}}>
        <p style={{fontSize:"0.56rem",letterSpacing:"0.18em",textTransform:"uppercase",color:C.accent,fontFamily:"sans-serif",fontWeight:300,marginBottom:12}}>Contact</p>
        <p style={{fontSize:"0.7rem",color:C.forest,fontFamily:"sans-serif",fontWeight:300,lineHeight:2}}>
          <a href="https://instagram.com/mymovementlab" target="_blank" rel="noopener noreferrer" style={{color:C.forest,textDecoration:"none"}}>@mymovementlab</a><br/>
          <a href="mailto:mymovementlab@gmail.com" style={{color:C.forest,textDecoration:"none"}}>mymovementlab@gmail.com</a>
        </p>
      </div>
    </div>
  );
}

function Home({onStart}){
  const [section,setSection]=useState("history");
  const [diff,setDiff]=useState("All");
  const [histTopic,setHistTopic]=useState("All");
  const [anatTopic,setAnatTopic]=useState("All");
  const [matTheme,setMatTheme]=useState("All");
  const [matLevel,setMatLevel]=useState("All");

  function getPool(){
    if(section==="history"){
      let p=histTopic==="All"?HISTORY:HISTORY.filter(q=>q.topic===histTopic);
      return diff==="All"?p:p.filter(q=>q.level===diff);
    }
    if(section==="anatomy"){
      let p=anatTopic==="All"?ANATOMY:ANATOMY.filter(q=>q.topic===anatTopic);
      return diff==="All"?p:p.filter(q=>q.level===diff);
    }
    return MAT.filter(q=>{
      const tm=matTheme==="All"||q.theme===matTheme;
      const lm=matLevel==="All"||q.level===matLevel;
      return tm&&lm;
    });
  }
  const pool=getPool();

  return(
    <div style={{maxWidth:600,margin:"0 auto",padding:"40px 22px 40px"}}>
      <p style={{fontSize:"0.58rem",letterSpacing:"0.18em",textTransform:"uppercase",color:C.accent,fontFamily:"sans-serif",fontWeight:300}}>Pilates Study Tool</p>
      <h1 style={{fontFamily:"Georgia,serif",fontStyle:"italic",fontWeight:300,fontSize:"clamp(1.8rem,5vw,2.8rem)",lineHeight:1.1,color:C.forest,margin:"10px 0 12px"}}>Study smarter,<br/><span style={{color:C.sageDark}}>teach better.</span></h1>
      <p style={{fontSize:"0.74rem",lineHeight:1.9,color:C.sageDark,maxWidth:400,marginBottom:32,fontFamily:"sans-serif",fontWeight:300}}>Because knowing <em>how</em> makes you a better teacher — wherever you are in your journey.</p>
      <SLabel>Choose a section</SLabel>
      <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:24}}>
        {Object.entries(SECTIONS).map(([key,cfg])=>(
          <button key={key} onClick={()=>setSection(key)} style={{border:`1px solid ${section===key?cfg.color:C.sageLight}`,background:section===key?"rgba(90,110,88,0.05)":"transparent",padding:"13px 16px",textAlign:"left",cursor:"pointer",transition:"all 0.18s"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontFamily:"Georgia,serif",fontStyle:"italic",fontSize:"0.93rem",color:section===key?cfg.color:C.forest}}>{cfg.emoji} {cfg.label}</span>
              <span style={{fontSize:"0.56rem",letterSpacing:"0.12em",textTransform:"uppercase",color:C.accent,fontFamily:"sans-serif",fontWeight:300}}>{key==="history"?HISTORY.length:key==="anatomy"?ANATOMY.length:MAT.length} questions</span>
            </div>
            <p style={{fontSize:"0.62rem",color:C.accent,fontFamily:"sans-serif",fontWeight:300,marginTop:3,letterSpacing:"0.05em"}}>{cfg.desc}</p>
          </button>
        ))}
      </div>
      {section==="history"&&<>
        <SLabel>Topic</SLabel>
        <div style={{display:"flex",gap:7,marginBottom:18,flexWrap:"wrap"}}>
          {HISTORY_TOPICS.map(t=><Pill key={t} label={t} active={histTopic===t} color={t==="All"?C.forest:C.gold} onClick={()=>setHistTopic(t)}/>)}
        </div>
        <SLabel>Difficulty</SLabel>
        <div style={{display:"flex",gap:7,marginBottom:32,flexWrap:"wrap"}}>
          {DIFF_LEVELS.map(d=><Pill key={d} label={d} active={diff===d} color={d==="All"?C.forest:DIFF_COLORS[d]} onClick={()=>setDiff(d)}/>)}
        </div>
      </>}
      {section==="anatomy"&&<>
        <SLabel>Topic</SLabel>
        <div style={{display:"flex",gap:7,marginBottom:18,flexWrap:"wrap"}}>
          {ANATOMY_TOPICS.map(t=><Pill key={t} label={t} active={anatTopic===t} color={t==="All"?C.forest:C.sageDark} onClick={()=>setAnatTopic(t)}/>)}
        </div>
        <SLabel>Difficulty</SLabel>
        <div style={{display:"flex",gap:7,marginBottom:32,flexWrap:"wrap"}}>
          {DIFF_LEVELS.map(d=><Pill key={d} label={d} active={diff===d} color={d==="All"?C.forest:DIFF_COLORS[d]} onClick={()=>setDiff(d)}/>)}
        </div>
      </>}
      {section==="mat"&&<>
        <SLabel>Theme</SLabel>
        <div style={{display:"flex",gap:7,marginBottom:18,flexWrap:"wrap"}}>
          {MAT_THEMES.map(t=><Pill key={t} label={t} active={matTheme===t} color={C.accent} onClick={()=>setMatTheme(t)}/>)}
        </div>
        <SLabel>Exercise level</SLabel>
        <div style={{display:"flex",gap:7,marginBottom:32,flexWrap:"wrap"}}>
          {MAT_LEVELS.map(l=><Pill key={l} label={l} active={matLevel===l} color={l==="All"?C.forest:DIFF_COLORS[l]} onClick={()=>setMatLevel(l)}/>)}
        </div>
      </>}
      <div style={{display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
        <Btn onClick={()=>onStart({section,diff,histTopic,anatTopic,matTheme,matLevel,pool:shuffle(pool)})} disabled={pool.length===0}>
          Begin {pool.length} question{pool.length!==1?"s":""} →
        </Btn>
        {pool.length===0&&<span style={{fontSize:"0.62rem",color:C.wrong,fontFamily:"sans-serif",fontWeight:300}}>No questions match</span>}
        <span style={{fontSize:"0.6rem",color:C.accent,fontFamily:"sans-serif",fontWeight:300}}>First 10 free</span>
      </div>
    </div>
  );
}

function Quiz({questions,config,onDone,onPaywall,unlocked}){
  const [idx,setIdx]=useState(0);
  const [answered,setAnswered]=useState(false);
  const [selected,setSelected]=useState(null);
  const [input,setInput]=useState("");
  const [score,setScore]=useState(0);

  const q=questions[idx];
  const total=questions.length;
  const cfg=SECTIONS[config.section];
  const TYPE_LABELS={mcq:"Multiple Choice",tf:"True / False",fill:"Fill in the Blank",flashcard:"Flashcard",sequence:"Sequencing",error:"Error Detection",scenario:"Scenario",cue_selection:"Cue Selection"};

  function handleAnswer(val){
    if(answered)return;
    setSelected(val);setAnswered(true);
    let correct=false;
    if(q.type==="fill")correct=val.toLowerCase().trim().includes(q.answer.toLowerCase().split("/")[0].trim().toLowerCase());
    else if(q.type==="flashcard"||q.type==="error"||q.type==="scenario")correct=true;
    else if(q.type==="sequence")correct=val;
    else correct=val===q.correct;
    if(correct)setScore(s=>s+1);
  }

  function next(){
    const nextIdx=idx+1;
    if(nextIdx>=total){onDone(score,total);return;}
    if(!unlocked&&nextIdx>=FREE_LIMIT){onPaywall();return;}
    setIdx(nextIdx);setAnswered(false);setSelected(null);setInput("");
  }

  const levelColor=config.section==="mat"?(q.level?DIFF_COLORS[q.level]:C.accent):(DIFF_COLORS[q.level]||C.accent);
  const topicTag=config.section==="history"?q.topic:config.section==="anatomy"?q.topic:q.exercise;

  return(
    <div style={{maxWidth:600,margin:"0 auto",padding:"28px 22px 40px"}}>
      <div style={{width:"100%",height:2,background:C.sageLight,marginBottom:28}}>
        <div style={{height:"100%",background:cfg.color,width:`${(idx/total)*100}%`,transition:"width 0.4s ease"}}/>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:7}}>
        <div style={{display:"flex",gap:7,alignItems:"center",flexWrap:"wrap"}}>
          <span style={{fontSize:"0.58rem",letterSpacing:"0.14em",textTransform:"uppercase",color:cfg.color,fontFamily:"sans-serif",fontWeight:300}}>{cfg.label}</span>
          {topicTag&&<><span style={{color:C.sageLight,fontSize:"0.6rem"}}>·</span><span style={{fontSize:"0.58rem",letterSpacing:"0.1em",textTransform:"uppercase",color:cfg.color,fontFamily:"sans-serif",fontWeight:300}}>{topicTag}</span></>}
          {q.level&&<><span style={{color:C.sageLight,fontSize:"0.6rem"}}>·</span><span style={{fontSize:"0.58rem",letterSpacing:"0.1em",textTransform:"uppercase",color:levelColor,fontFamily:"sans-serif",fontWeight:300}}>{q.level}</span></>}
        </div>
        <div style={{display:"flex",gap:7}}>
          <span style={{fontSize:"0.56rem",letterSpacing:"0.1em",textTransform:"uppercase",color:C.accent,fontFamily:"sans-serif",fontWeight:300}}>{TYPE_LABELS[q.type]}</span>
          <span style={{fontSize:"0.56rem",color:C.accent,fontFamily:"sans-serif",fontWeight:300}}>{idx+1}/{total}</span>
        </div>
      </div>
      <p style={{fontFamily:"Georgia,serif",fontStyle:"italic",fontSize:"clamp(1rem,2.8vw,1.45rem)",lineHeight:1.45,color:C.forest,marginBottom:22,minHeight:50}}>{q.q}</p>
      {q.type==="mcq"&&<MCQ q={q} onAnswer={handleAnswer} answered={answered} selected={selected}/>}
      {q.type==="cue_selection"&&<MCQ q={q} onAnswer={handleAnswer} answered={answered} selected={selected}/>}
      {q.type==="tf"&&<TF q={q} onAnswer={handleAnswer} answered={answered} selected={selected}/>}
      {q.type==="flashcard"&&<Flashcard q={q} onAnswer={handleAnswer} answered={answered}/>}
      {q.type==="fill"&&<Fill q={q} onAnswer={handleAnswer} answered={answered} input={input} setInput={setInput}/>}
      {q.type==="sequence"&&<Sequence q={q} onAnswer={handleAnswer} answered={answered}/>}
      {q.type==="error"&&<ErrorDetect q={q} onAnswer={handleAnswer} answered={answered}/>}
      {q.type==="scenario"&&<Scenario q={q} onAnswer={handleAnswer} answered={answered}/>}
      {answered&&q.explanation&&(
        <div style={{marginTop:16,padding:"12px 15px",borderLeft:`2px solid ${cfg.color}`,background:"rgba(90,110,88,0.04)",fontSize:"0.71rem",lineHeight:1.75,color:C.forest,fontFamily:"sans-serif",fontWeight:300}}>{q.explanation}</div>
      )}
      {answered&&(
        <div style={{display:"flex",justifyContent:"flex-end",marginTop:20}}>
          <Btn onClick={next}>{idx+1>=total?"See results →":"Next →"}</Btn>
        </div>
      )}
    </div>
  );
}

function Results({score,total,section,onRetry,onHome}){
  const pct=score/total;
  const cfg=SECTIONS[section];
  const msg=pct===1?"Perfect score. You know this inside out.":pct>=0.8?"Really strong. Almost there.":pct>=0.6?"Good foundation. Focus on what you missed.":"Keep going — every attempt builds your understanding.";
  return(
    <div style={{maxWidth:480,margin:"0 auto",padding:"52px 22px 40px"}}>
      <span style={{fontSize:"0.56rem",letterSpacing:"0.16em",textTransform:"uppercase",color:cfg.color,fontFamily:"sans-serif",fontWeight:300}}>{cfg.label} · Complete</span>
      <div style={{fontFamily:"Georgia,serif",fontStyle:"italic",fontSize:"clamp(2.8rem,9vw,4.8rem)",lineHeight:1,color:cfg.color,margin:"10px 0 5px"}}>{score}/{total}</div>
      <p style={{fontSize:"0.64rem",letterSpacing:"0.1em",color:C.forest,fontFamily:"sans-serif",fontWeight:300,marginBottom:26}}>correct answers</p>
      <p style={{fontFamily:"Georgia,serif",fontStyle:"italic",fontSize:"1.1rem",color:C.forest,lineHeight:1.55,marginBottom:36,maxWidth:300}}>{msg}</p>
      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        <Btn onClick={onRetry}>Retry</Btn>
        <Btn onClick={onHome} variant="ghost">Choose another section</Btn>
      </div>
    </div>
  );
}

export default function App(){
  const [screen,setScreen]=useState("home");
  const [questions,setQuestions]=useState([]);
  const [config,setConfig]=useState({});
  const [finalScore,setFinalScore]=useState(0);
  const [finalTotal,setFinalTotal]=useState(0);
  const [unlocked,setUnlocked]=useState(false);
  const [showPaywall,setShowPaywall]=useState(false);

  function startQuiz(cfg){
    setQuestions(cfg.pool);
    setConfig(cfg);
    setShowPaywall(false);
    setScreen("quiz");
  }

  return(
    <div style={{minHeight:"100vh",background:C.cream,display:"flex",flexDirection:"column"}}>
      <Header/>
      <div style={{flex:1}}>
        {screen==="home"&&!showPaywall&&<Home onStart={startQuiz}/>}
        {screen==="quiz"&&!showPaywall&&<Quiz questions={questions} config={config} unlocked={unlocked} onPaywall={()=>setShowPaywall(true)} onDone={(s,t)=>{setFinalScore(s);setFinalTotal(t);setScreen("results");}}/>}
        {showPaywall&&<Paywall onUnlock={()=>{setUnlocked(true);setShowPaywall(false);}}/>}
        {screen==="results"&&!showPaywall&&<Results score={finalScore} total={finalTotal} section={config.section} onRetry={()=>startQuiz(config)} onHome={()=>setScreen("home")}/>}
        {screen==="about"&&<About onBack={()=>setScreen("home")}/>}
      </div>
      <div style={{padding:"12px 24px",borderTop:`1px solid ${C.sageLight}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontFamily:"Georgia,serif",fontStyle:"italic",fontSize:"0.78rem",color:C.accent}}>My Movement Lab</span>
        <button onClick={()=>setScreen("about")} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"sans-serif",fontWeight:300,fontSize:"0.58rem",letterSpacing:"0.14em",textTransform:"uppercase",color:C.accent,padding:0}}>About</button>
      </div>
    </div>
  );
}
