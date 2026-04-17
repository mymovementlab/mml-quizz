import { useState } from "react" ;

const C = {
sageDark:”#5A6E58 ”, sageLight:”#C8D8CC”, cream:”#F5F0E8”,
forest:”#2E3832”, accent:”#8FA68C”, right:”#6A9B7A”, wrong:”#C17A6F”, gold:”#B8A060”,
};

// ─── HISTORY & PRINCIPLES ────────────────────────────────────────────────────
// topics: "Joseph Pilates” | "The 10 Principles” | "Pelvis & Neutral Spine” | "Breathing”

const HISTORY = [
{ id:"h1”, type:"mcq”, difficulty:"easy”, topic:"Joseph Pilates”, q:"Where was Joseph Pilates born?”, options:["New York, USA”,"Near Düsseldorf, Germany”,"London, England”,"Vienna, Austria”], correct:1, explanation:"Joseph Pilates was born near Düsseldorf, Germany in 1883. He later traveled to England in 1912 and ultimately settled in New York City.” },
{ id:"h2”, type:"mcq”, difficulty:"easy”, topic:"Joseph Pilates”, q:"In what year did Joseph and Clara Pilates open their first studio in New York City?”, options:["1912”,"1918”,"1926”,"1934”], correct:2, explanation:"Joseph and Clara Pilates set up their first studio in New York City in 1926. A diverse population frequented the studio including dancers, gymnasts, and circus performers.” },
{ id:"h3”, type:"mcq”, difficulty:"medium”, topic:"Joseph Pilates”, q:"While interned on the Isle of Man during WWI, what did Joseph Pilates begin?”, options:["Writing his first book”,"Devising apparatus to aid rehabilitation of the disabled and sick”,"Training the German army”,"Teaching classical ballet”], correct:1, explanation:"While interned on the Isle of Man, Pilates began devising apparatus to aid in the rehabilitation of the disabled and sick. He is credited with helping many during the influenza epidemic of that time.” },
{ id:"h4”, type:"mcq”, difficulty:"medium”, topic:"Joseph Pilates”, q:"Why did Joseph Pilates leave Germany after World War I?”, options:["He wanted a studio in London”,"He recognised the implications of training the new German Army and chose to leave for America”,"Clara insisted they move”,"He had a contract in New York”], correct:1, explanation:"After the war, Pilates was invited by the German government to train the new German Army. Recognising the implications, he decided to leave for America instead.” },
{ id:"h5”, type:"mcq”, difficulty:"medium”, topic:"Joseph Pilates”, q:"Which community particularly recognised the value of Pilates’ work early on?”, options:["The medical community”,"The military”,"The dance community”,"Olympic athletes”], correct:2, explanation:"It was particularly the dance community — including luminaries like George Balanchine, Ted Shawn, and Martha Graham — who truly recognised the value of this work for both rehabilitation and performance.” },
{ id:"h6”, type:"tf”, difficulty:"easy”, topic:"Joseph Pilates”, q:"Joseph Pilates called his method ‘Contrology’.”, correct:true, explanation:"Joseph Pilates called his method Contrology — he regarded it as a way of life and a path to total health, not merely a series of exercises.” },
{ id:"h7”, type:"tf”, difficulty:"easy”, topic:"Joseph Pilates”, q:"Joseph Pilates left extensive written materials to guide future generations of teachers.”, correct:false, explanation:"Joseph Pilates did NOT leave extensive written materials. He wrote only two short books, and mainly word of mouth and movement passed his teachings forward.” },
{ id:"h8”, type:"mcq”, difficulty:"hard”, topic:"Joseph Pilates”, q:"Approximately how many exercises did Joseph Pilates develop across all apparatus?”, options:["Over 100”,"Over 300”,"Over 600”,"Over 1000”], correct:2, explanation:"Over his career, Joseph Pilates developed over 600 exercises for the various pieces of apparatus he invented. His guiding philosophy was that the ‘whole’ must be exercised to achieve good health.” },
{ id:"h9”, type:"mcq”, difficulty:"medium”, topic:"Joseph Pilates”, q:"What was Joseph Pilates’ original vision for his method?”, options:["A rehabilitation system for dancers only”,"A way of life and path to total health — not merely a series of exercises”,"A fitness regimen for the military”,"A competitive sport”], correct:1, explanation:"Joseph Pilates regarded his method as a way of life and a path to total health rather than merely a series of exercises. He hoped Contrology would be taught in schools and embraced by the general public.” },
{ id:"h10”, type:"mcq”, difficulty:"medium”, topic:"Joseph Pilates”, q:"Which dance community luminaries are mentioned as early champions of Pilates?”, options:["Martha Graham, George Balanchine, and Ted Shawn”,"Rudolf Nureyev and Margot Fonteyn”,"Isadora Duncan and Alvin Ailey”,"Fred Astaire and Gene Kelly”], correct:0, explanation:"George Balanchine, Ted Shawn, Martha Graham and many other dancers truly recognised the value of this work — for both rehabilitation and enhancing performance.” },
{ id:"h11”, type:"mcq”, difficulty:"medium”, topic:"Joseph Pilates”, q:"What were the two key things Joseph Pilates brought together in creating his method?”, options:["Eastern philosophy and Western bodybuilding”,"Ballet technique and gymnastics”,"A holistic approach and scientific understanding of the body”,"Yoga and martial arts”], correct:0, explanation:"Joseph Pilates studied both Eastern and Western forms of exercise and philosophies, and was greatly influenced by ancient Grecian and Roman regimens — bringing them together into one system.” },
{ id:"h12”, type:"mcq”, difficulty:"hard”, topic:"Joseph Pilates”, q:"What childhood conditions did Joseph Pilates suffer from that drove his pursuit of physical fitness?”, options:["Scoliosis and flat feet”,"Rickets, asthma, and rheumatic fever”,"Heart disease and weak lungs”,"Poor eyesight and coordination”], correct:1, explanation:"Joseph Pilates was a sickly child, plagued with rickets, asthma, and rheumatic fever. His drive to overcome these ailments led to his pursuit of bodybuilding, gymnastics, diving, and other physical disciplines.” },
{ id:"h13”, type:"mcq”, difficulty:"easy”, topic:"The 10 Principles”, q:"How many principles are recognised in contemporary Pilates programs?”, options:["6”,"8”,"10”,"12”], correct:2, explanation:"Many contemporary Pilates programs recognise 10 principles: Awareness, Balance, Breath, Center, Concentration, Control, Efficiency, Flow, Harmony, and Precision.” },
{ id:"h14”, type:"mcq”, difficulty:"medium”, topic:"The 10 Principles”, q:"Which of these is NOT one of the 10 principles of Pilates?”, options:["Efficiency”,"Harmony”,"Flexibility”,"Awareness”], correct:2, explanation:"Flexibility is not one of the 10 principles — though it is a benefit of practice. The 10 are: Awareness, Balance, Breath, Center, Concentration, Control, Efficiency, Flow, Harmony, and Precision.” },
{ id:"h15”, type:"tf”, difficulty:"easy”, topic:"The 10 Principles”, q:”‘Flow’ as a Pilates principle describes smooth, uninterrupted continuity of movement.”, correct:true, explanation:"Flow is described as smooth, uninterrupted continuity of movement. It requires deep understanding of the movement, precise muscle activation, and timing.” },
{ id:"h16”, type:"mcq”, difficulty:"medium”, topic:"The 10 Principles”, q:"What does the principle of ‘Precision’ mean in Pilates?”, options:["Moving as quickly as possible”,"The exact manner in which an action is executed”,"Holding positions for 8 counts”,"Breathing in a set pattern”], correct:1, explanation:"Precision is the exact manner in which an action is executed. Often the exercise itself is not significantly different from other systems, but the way it is executed is what makes Pilates distinctive.” },
{ id:"h17”, type:"mcq”, difficulty:"medium”, topic:"The 10 Principles”, q:"What does the principle of ‘Center’ refer to?”, options:["The geographical centre of the studio”,"The core of the body — the powerhouse — from which all movement emanates”,"Standing in the middle of the mat”,"The centre of gravity only”], correct:1, explanation:"Center generally refers to the core of the body — often called the powerhouse. It is the spring from which all movement emanates.” },
{ id:"h18”, type:"tf”, difficulty:"medium”, topic:"The 10 Principles”, q:"The principle of ‘Control’ means performing every exercise as slowly as possible.”, correct:false, explanation:"Control means that no movement is performed haphazardly — every action is guided by deliberate muscular effort. It does not mean slow; it means regulated and intentional.” },
{ id:"h19”, type:"mcq”, difficulty:"hard”, topic:"The 10 Principles”, q:"How does ‘Concentration’ function as a Pilates principle?”, options:["Counting repetitions carefully”,"Direction of full mental attention to mastering the exercise including breath, alignment, and muscles”,"Focusing only on the breath”,"Memorising the exercise sequence”], correct:1, explanation:"Concentration means directing full mental attention to the mastery of a given exercise — including awareness of breath pattern and the muscles about to be worked.” },
{ id:"h20”, type:"fill”, difficulty:"easy”, topic:"The 10 Principles”, q:"The principle of ___ refers to smooth, uninterrupted continuity of movement.”, answer:"Flow”, hint:"One of the 10 principles”, explanation:"Flow is described as smooth, uninterrupted continuity of movement. It requires deep understanding of movement, precise muscle activation, and timing.” },
{ id:"h21”, type:"mcq”, difficulty:"medium”, topic:"The 10 Principles”, q:"What does ‘Awareness’ as a principle encourage in practice?”, options:["Awareness of only the breath”,"A heightened consciousness of the body, alignment, and movement quality throughout practice”,"Awareness of the teacher’s instructions only”,"Counting repetitions”], correct:1, explanation:"Awareness involves a heightened consciousness of the body — its alignment, the muscles working, the quality of movement. It is the foundation from which all other principles can be applied.” },
{ id:"h22”, type:"mcq”, difficulty:"hard”, topic:"The 10 Principles”, q:"What does the principle of ‘Harmony’ describe?”, options:["Matching music to exercise”,"The integrated mind-body connection — all principles working together fluidly”,"Exercising with a partner”,"The symmetrical development of the body”], correct:1, explanation:"Harmony describes the integrated mind-body connection — the state in which all principles are present and working together fluidly. It is the ultimate expression of the method practiced at its fullest.” },
{ id:"h23”, type:"mcq”, difficulty:"medium”, topic:"The 10 Principles”, q:"What does ‘Efficiency’ as a principle mean in Pilates?”, options:["Completing exercises as fast as possible”,"Achieving maximum results with minimum effort — no excess tension or wasted energy”,"Using minimal equipment”,"Shortening the class duration”], correct:1, explanation:"Efficiency describes achieving the desired result with minimum effort and no excess tension. Refined control is associated with less effort — not more. This is one hallmark of advanced practice.” },
{ id:"h24”, type:"mcq”, difficulty:"medium”, topic:"Pelvis & Neutral Spine”, q:"What is neutral pelvis?”, options:["A position where the lower back is completely flat”,"The position where the ASIS and the pubic symphysis are in the same horizontal plane”,"Maximum anterior pelvic tilt”,"Full posterior pelvic tilt”], correct:1, explanation:"Neutral pelvis is the position where the anterior superior iliac spine (ASIS) on each side and the pubic symphysis (PS) are in the same horizontal plane. The resulting spinal position is neutral spine.” },
{ id:"h25”, type:"mcq”, difficulty:"medium”, topic:"Pelvis & Neutral Spine”, q:"If the pubic symphysis is HIGHER than the ASIS when lying supine, what does this indicate?”, options:["Neutral pelvis”,"Anterior pelvic tilt (arch)”,"Posterior pelvic tilt (tuck)”,"Scoliosis”], correct:2, explanation:"If the pubic symphysis is higher than the ASIS when lying supine, a posterior pelvic tilt (tuck) is indicated. If the ASIS are higher than the PS, an anterior tilt (arch) is indicated.” },
{ id:"h26”, type:"tf”, difficulty:"medium”, topic:"Pelvis & Neutral Spine”, q:"When the spine is in neutral, the pelvis must also be in neutral.”, correct:true, explanation:"When the spine is in neutral, the pelvis must be in neutral. However, there are instances when the pelvis may be in neutral and the spine not — but not the reverse.” },
{ id:"h27”, type:"mcq”, difficulty:"hard”, topic:"Pelvis & Neutral Spine”, q:"Which two muscles does research single out as most important for stabilisation and prevention of back pain?”, options:["Rectus abdominis and erector spinae”,"Transversus abdominis (TA) and multifidus”,"External obliques and gluteus maximus”,"Iliopsoas and quadratus lumborum”], correct:1, explanation:"Research has singled out the transversus abdominis (TA) and the multifidus as having the most profound effect on stabilisation and the prevention of back pain.” },
{ id:"h28”, type:"mcq”, difficulty:"medium”, topic:"Pelvis & Neutral Spine”, q:"What is the most important abdominal muscle for stabilisation?”, options:["Rectus abdominis”,"External obliques”,"Transversus abdominis (TA)”,"Internal obliques”], correct:2, explanation:"The transversus abdominis (TA) is the most important for stabilisation. While the rectus abdominis is often emphasised, it does little for stabilisation and is primarily a trunk flexor.” },
{ id:"h29”, type:"mcq”, difficulty:"easy”, topic:"Pelvis & Neutral Spine”, q:"What is the primary benefit of working in neutral spine?”, options:["It makes exercises easier”,"It encourages balanced muscular development, correct muscle recruitment, and efficient posture”,"It protects the lower back in all circumstances”,"It is required for all Pilates exercises”], correct:1, explanation:"Working in neutral spine encourages balanced muscular development, correct muscle recruitment, and teaches efficient posture and ideal alignment.” },
{ id:"h30”, type:"mcq”, difficulty:"medium”, topic:"Pelvis & Neutral Spine”, q:"What does ‘imprinting’ describe in Pilates teaching?”, options:["Pressing the spine firmly into the mat at all times”,"Using the image of the body making an imprint in the ground to encourage fluid sequential movement”,"Memorising the exercise sequence”,"Marking the mat to track foot position”], correct:1, explanation:"Imprinting uses the image of body parts making an imprint into the ground. The ‘bones’ are moved out of and back into the imprint — encouraging sequential articulation without excess tension.” },
{ id:"h31”, type:"mcq”, difficulty:"hard”, topic:"Pelvis & Neutral Spine”, q:"What does the pelvis serve as in terms of body structure?”, options:["The anchor of the spine”,"A bridge between the upper and lower body in terms of structure and function”,"A fixed bony structure”,"The primary weight-bearing joint”], correct:1, explanation:"The pelvis serves as a bridge between the upper and lower body. Its alignment influences body segments above and below it, affecting movement efficiency and potentially causing pain if misaligned.” },
{ id:"h32”, type:"mcq”, difficulty:"hard”, topic:"Pelvis & Neutral Spine”, q:"To correct an anterior pelvic tilt, which muscles need to be strengthened (moving pelvis posteriorly)?”, options:["Spinal extensors and hip flexors”,"Abdominals and hamstrings”,"Adductors and quadriceps”,"Gluteus medius and tibialis anterior”], correct:1, explanation:"The muscles that correct anterior tilt by moving the pelvis posteriorly are the abdominals and hamstrings. Muscles that correct posterior tilt by moving anteriorly are the spinal extensors and hip flexors.” },
{ id:"h33”, type:"mcq”, difficulty:"easy”, topic:"Breathing”, q:"What is ‘lateral breathing’ or ‘intercostal breathing’ primarily used for in Pilates?”, options:["To increase lung capacity”,"To facilitate and maintain abdominal contraction during exercises, especially during inhalation”,"To slow the heart rate”,"To expand the chest upward”], correct:1, explanation:"Lateral breathing is used to facilitate and maintain abdominal contraction while performing exercises, particularly during inhalation — since normal diaphragmatic breathing demands relaxation of the abdominals on the inhale.” },
{ id:"h34”, type:"mcq”, difficulty:"medium”, topic:"Breathing”, q:"What happens to the diaphragm during inhalation?”, options:["It rises upward into a dome shape”,"It contracts and flattens, lowering to enlarge the thoracic cavity”,"It relaxes completely”,"It moves sideways”], correct:1, explanation:"During inhalation, the diaphragm contracts and flattens, lowering and enlarging the thoracic cavity. This decreases intrapulmonary pressure, drawing air into the lungs.” },
{ id:"h35”, type:"tf”, difficulty:"easy”, topic:"Breathing”, q:"Breathing in Pilates can help recruit the appropriate muscles for movements.”, correct:true, explanation:"Among the benefits of breath in Pilates: it oxygenates the blood, calms the mind, encourages concentration, recruits appropriate muscles for movements, and provides an inner rhythm.” },
{ id:"h36”, type:"mcq”, difficulty:"hard”, topic:"Breathing”, q:"During normal diaphragmatic breathing, approximately what percentage of respiratory effort is the diaphragm responsible for?”, options:["25%”,"50%”,"75%”,"90%”], correct:2, explanation:"In regular diaphragmatic breathing, the diaphragm is responsible for approximately 75% of the respiratory effort. When it contracts, it flattens, increasing the vertical dimension of the thorax.” },
{ id:"h37”, type:"tf”, difficulty:"hard”, topic:"Breathing”, q:"Practicing set breathing patterns always has a positive transfer to functional movement.”, correct:false, explanation:"This is controversial. EMG studies show that recruitment of the TA and desired muscles occurs in functional movement without any attempt to shape breathing. Some approaches therefore choose not to use set breathing patterns.” },
{ id:"h38”, type:"mcq”, difficulty:"medium”, topic:"Breathing”, q:"What is the lateral expansion of the ribcage during breathing called in Pilates?”, options:["Diaphragmatic breathing”,"Lateral or intercostal breathing”,"Paradoxical breathing”,"Costal breathing only”], correct:1, explanation:"In Pilates, the lateral expansion of the rib cage is emphasised and called lateral breathing or intercostal breathing. It helps maintain abdominal engagement even during inhalation.” },
{ id:"h39”, type:"mcq”, difficulty:"easy”, topic:"Breathing”, q:"What does the imagery cue ‘navel to spine’ or ‘scooping the belly’ refer to?”, options:["Arching the lower back”,"Engaging the transversus abdominis to compress and draw in the abdominal cavity”,"Tucking the pelvis under”,"Breathing into the belly”], correct:1, explanation:”‘Navel to spine’ and ‘scooping the belly’ are imagery cues referring to engaging the transversus abdominis (TA) to compress the abdominal cavity — crucial for spinal stabilisation.” },
{ id:"h40”, type:"mcq”, difficulty:"medium”, topic:"Breathing”, q:"Why is normal diaphragmatic breathing less preferred during some Pilates exercises?”, options:["It causes dizziness”,"Diaphragmatic breathing requires the abdominals to relax during inhalation, which can compromise core stability”,"It expands the chest too much”,"It is not rhythmic enough”], correct:1, explanation:"Normal diaphragmatic breathing demands relaxation of the abdominals during inhalation. In an effort to maintain the abdominal wall pulled inward, lateral breathing is preferred during many Pilates exercises.” },
];

// ─── ANATOMY ─────────────────────────────────────────────────────────────────
// topics: "Planes & Directions” | "Joints” | "Joint Movements” | "Muscles by Region” | "Posture” | "Muscle Types & Contractions”

const ANATOMY = [
{ id:"a1”, type:"mcq”, difficulty:"easy”, topic:"Planes & Directions”, q:"Which plane divides the body into left and right portions?”, options:["Coronal/Frontal plane”,"Transverse plane”,"Sagittal plane”,"Median plane”], correct:2, explanation:"The sagittal plane divides the body into left and right portions. The mid-sagittal (median) plane divides the body into equal left and right halves.” },
{ id:"a2”, type:"tf”, difficulty:"easy”, topic:"Planes & Directions”, q:"The transverse plane divides the body into upper and lower portions.”, correct:true, explanation:"The transverse plane is a horizontal plane dividing the body into upper and lower portions. Sagittal divides left/right, and coronal/frontal divides front/back.” },
{ id:"a3”, type:"mcq”, difficulty:"easy”, topic:"Planes & Directions”, q:"What does ‘anterior’ mean?”, options:["Back side”,"Closer to the midline”,"Front side / in front of”,"Above / towards the head”], correct:2, explanation:"Anterior means front side or in front of. The opposite is posterior (back side).” },
{ id:"a4”, type:"mcq”, difficulty:"easy”, topic:"Planes & Directions”, q:”‘Medial’ means:”, options:["Further from the midline, toward the side”,"Closer toward the median plane / midline”,"Above, towards the head”,"In front of”], correct:1, explanation:"Medial means closer toward the median plane or midline of the body. Lateral is the opposite — further from the midline, toward the side.” },
{ id:"a5”, type:"mcq”, difficulty:"easy”, topic:"Planes & Directions”, q:"What does ‘superior’ mean?”, options:["In front of”,"Closer to the midline”,"Above / towards the head”,"Further from the root of the limb”], correct:2, explanation:"Superior means above or towards the head. Inferior means below or towards the feet.” },
{ id:"a6”, type:"mcq”, difficulty:"easy”, topic:"Planes & Directions”, q:"What does ‘proximal’ mean?”, options:["Further from the root of the limb”,"Closer to the root of the limb or center of the body”,"Below, toward the feet”,"Turning the anterior surface inward”], correct:1, explanation:"Proximal means closer to the root of the limb or center of the body. Distal means further from the root.” },
{ id:"a7”, type:"mcq”, difficulty:"easy”, topic:"Planes & Directions”, q:"What does ‘supine’ mean?”, options:["Lying face down”,"Lying on the back, face upward”,"Standing with palms forward”,"Kneeling on all fours”], correct:1, explanation:"Supine means lying on the back of the body with the face upward. Prone is the opposite — lying on the front of the body with face downward.” },
{ id:"a8”, type:"tf”, difficulty:"easy”, topic:"Planes & Directions”, q:"The coronal/frontal plane divides the body into front and back portions.”, correct:true, explanation:"The coronal (frontal) plane is a vertical plane dividing the body into front (anterior) and back (posterior) portions. Lateral flexion of the spine occurs in the coronal plane.” },
{ id:"a9”, type:"mcq”, difficulty:"medium”, topic:"Planes & Directions”, q:"Abduction and adduction occur around which axis?”, options:["Longitudinal / vertical axis”,"Coronal / mediolateral (M-L) axis”,"Sagittal / anteroposterior (A-P) axis”,"Transverse axis”], correct:2, explanation:"Abduction and adduction occur around the sagittal/anteroposterior (A-P) axis, which extends from front to back. Flexion-extension occurs around the coronal/mediolateral axis.” },
{ id:"a10”, type:"mcq”, difficulty:"medium”, topic:"Planes & Directions”, q:"Medial-lateral rotation of the spine occurs around which axis?”, options:["Sagittal axis”,"Coronal / mediolateral axis”,"Longitudinal / vertical axis”,"Transverse axis”], correct:2, explanation:"Medial-lateral rotation occurs around the longitudinal/vertical axis, which runs from top to bottom. Flexion-extension occurs around the coronal/mediolateral axis.” },
{ id:"a11”, type:"mcq”, difficulty:"easy”, topic:"Joints”, q:"What type of joint is the hip?”, options:["Hinge joint”,"Pivot joint”,"Ball-and-socket joint”,"Saddle joint”], correct:2, explanation:"The hip is a ball-and-socket joint (Spheroid joint) — formed between a spherical head and a concave socket, allowing movement in three planes.” },
{ id:"a12”, type:"mcq”, difficulty:"easy”, topic:"Joints”, q:"What type of joint is the knee?”, options:["Ball-and-socket joint”,"Saddle joint”,"Hinge joint (Ginglymus)”,"Pivot joint”], correct:2, explanation:"The knee is a hinge joint (Ginglymus joint) — allowing forward-backward movement primarily in one plane. The elbow and ankle are also hinge joints.” },
{ id:"a13”, type:"tf”, difficulty:"easy”, topic:"Joints”, q:"The shoulder is an example of a ball-and-socket joint.”, correct:true, explanation:"Both the shoulder (glenohumeral joint) and the hip are ball-and-socket joints — allowing movement in three planes.” },
{ id:"a14”, type:"mcq”, difficulty:"medium”, topic:"Joints”, q:"What type of joint is the intervertebral disc an example of?”, options:["Synovial joint”,"Fibrous joint”,"Cartilaginous joint”,"Gliding joint”], correct:2, explanation:"The intervertebral disc is a cartilaginous joint — where bones are directly connected by cartilage. It is slightly movable, unlike the freely movable synovial joints.” },
{ id:"a15”, type:"tf”, difficulty:"medium”, topic:"Joints”, q:"A fibrous joint is an example of a freely movable joint.”, correct:false, explanation:"A fibrous joint is where bones are directly connected by fibrous tissue — it is immovable (e.g. sutures of the skull). A synovial joint is freely movable (e.g. hip, shoulder, knee).” },
{ id:"a16”, type:"mcq”, difficulty:"medium”, topic:"Joints”, q:"Which is an example of a pivot joint (Trochoid)?”, options:["Hip”,"Knee”,"Atlas-axis (top two cervical vertebrae)”,"Wrist”], correct:2, explanation:"The atlas-axis joint (between the top two cervical vertebrae) is a pivot joint — formed between a rounded surface and an arch-shaped surface, allowing rotation in one plane.” },
{ id:"a17”, type:"mcq”, difficulty:"hard”, topic:"Joints”, q:"What is a key principle regarding mobility and stability in joints?”, options:["More mobility always means more stability”,"Joints that have greater mobility by nature have less stability — and vice versa”,"Stability and mobility are independent of each other”,"Only synovial joints have stability issues”], correct:1, explanation:"Joints with greater mobility by nature have less stability. The challenge arises when a joint needs both mobility and stability — such stability must be created by muscular strength through the full range of motion.” },
{ id:"a18”, type:"mcq”, difficulty:"easy”, topic:"Joint Movements”, q:"Dorsiflexion of the ankle-foot means:”, options:["Pointing the foot downward”,"Bringing the top of the foot up towards the shin”,"Rolling the foot inward”,"Turning the palm forward”], correct:1, explanation:"Dorsiflexion means bringing the top of the foot up towards the shin. Plantar flexion is the opposite: pointing the foot downward.” },
{ id:"a19”, type:"mcq”, difficulty:"easy”, topic:"Joint Movements”, q:"What is abduction?”, options:["Moving toward the midline”,"Moving away from the midline of the body”,"Bending a joint”,"Turning the anterior surface outward”], correct:1, explanation:"Abduction means moving away from the midline of the body. Adduction is the opposite — moving toward the midline.” },
{ id:"a20”, type:"mcq”, difficulty:"easy”, topic:"Joint Movements”, q:"What is internal rotation?”, options:["Moving away from the midline”,"Turning the anterior surface inward”,"Turning the anterior surface outward”,"Bending a joint past anatomical position”], correct:1, explanation:"Internal rotation means turning the anterior surface inward. External rotation means turning the anterior surface outward.” },
{ id:"a21”, type:"mcq”, difficulty:"easy”, topic:"Joint Movements”, q:"What does plantar flexion mean?”, options:["Bringing the top of the foot up”,"Bringing the bottom of the foot downward / pointing the foot”,"Rolling the foot outward”,"Bending the knee”], correct:1, explanation:"Plantar flexion means bringing the bottom of the foot downwards — pointing the foot. Dorsiflexion is the opposite.” },
{ id:"a22”, type:"mcq”, difficulty:"medium”, topic:"Joint Movements”, q:"Scapular adduction (retraction) means:”, options:["Bringing the shoulder blade forward and away from the spine”,"Bringing the shoulder blade towards the spine”,"Lifting the shoulder blade up toward the ear”,"Rotating the acromion process upward”], correct:1, explanation:"Scapular adduction (retraction) means bringing the shoulder blade towards the spine. Scapular abduction (protraction) is the opposite.” },
{ id:"a23”, type:"mcq”, difficulty:"medium”, topic:"Joint Movements”, q:"What does ‘lateral flexion’ of the spine mean?”, options:["Bending the trunk forward”,"Bending the trunk backward”,"Side-bending of the trunk to the right or left”,"Turning the front of the trunk to one side”], correct:2, explanation:"Lateral flexion of the spine is side-bending of the trunk to the right or left. Rotation means turning the front of the trunk to one side.” },
{ id:"a24”, type:"mcq”, difficulty:"medium”, topic:"Joint Movements”, q:"What does ‘inversion’ of the foot mean?”, options:["Lifting the lateral/outside portion of the foot upwards”,"Lifting the medial/inside portion of the foot upwards”,"Rolling the foot outward”,"Pointing the foot downward”], correct:1, explanation:"Inversion means lifting the medial/inside portion of the foot upwards. Eversion is the opposite — lifting the lateral/outside portion.” },
{ id:"a25”, type:"mcq”, difficulty:"medium”, topic:"Joint Movements”, q:"What is hyperextension?”, options:["Full flexion of a joint”,"Moving in extension past the anatomical position”,"Moving toward the midline”,"Turning the anterior surface outward”], correct:1, explanation:"Hyperextension means moving in extension past the anatomical position.” },
{ id:"a26”, type:"fill”, difficulty:"medium”, topic:"Joint Movements”, q:"Rotation of the spine means turning the front of the ___ or trunk to the right or left.”, answer:"head”, hint:"The structure above the neck”, explanation:"Rotation of the spine means turning the front of the head or trunk to the right or left — distinct from lateral flexion, which is side-bending.” },
{ id:"a27”, type:"mcq”, difficulty:"medium”, topic:"Joint Movements”, q:"Scapular depression means:”, options:["Lifting the shoulder blade toward the ear”,"Lowering the shoulder blade toward the waist”,"Bringing the shoulder blade forward”,"Rotating the acromion process downward”], correct:1, explanation:"Scapular depression means lowering the shoulder blade toward the waist. Scapular elevation is the opposite — lifting the shoulder blade toward the ear.” },
{ id:"a28”, type:"mcq”, difficulty:"easy”, topic:"Muscles by Region”, q:"Which muscles are the primary movers for spinal flexion?”, options:["Erector spinae”,"Quadratus lumborum”,"Rectus abdominis, external oblique, and internal oblique”,"Multifidus”], correct:2, explanation:"The primary movers for spinal flexion are the rectus abdominis, external oblique, and internal oblique. The erector spinae is the prime mover for spinal extension.” },
{ id:"a29”, type:"mcq”, difficulty:"easy”, topic:"Muscles by Region”, q:"Which muscles are the primary movers for hip extension?”, options:["Iliopsoas and rectus femoris”,"Hamstrings and gluteus maximus”,"Gluteus medius and minimus”,"Adductor longus and gracilis”], correct:1, explanation:"The primary movers for hip extension are the hamstrings and gluteus maximus. The hip flexors (iliopsoas, rectus femoris, sartorius) are their antagonists.” },
{ id:"a30”, type:"mcq”, difficulty:"medium”, topic:"Muscles by Region”, q:"Which muscles produce hip abduction?”, options:["Adductor longus, adductor brevis, gracilis”,"Hamstrings and gluteus maximus”,"Gluteus medius and gluteus minimus”,"Iliopsoas and rectus femoris”], correct:2, explanation:"The primary movers for hip abduction are the gluteus medius and gluteus minimus. Hip adduction is produced by the adductors, gracilis, and pectineus.” },
{ id:"a31”, type:"mcq”, difficulty:"medium”, topic:"Muscles by Region”, q:"Which muscles produce hip flexion?”, options:["Hamstrings and gluteus maximus”,"Gluteus medius and minimus”,"Iliopsoas, rectus femoris, and sartorius”,"Adductor longus and gracilis”], correct:2, explanation:"The primary movers for hip flexion are the iliopsoas, rectus femoris, and sartorius. Hip extension is produced by the hamstrings and gluteus maximus.” },
{ id:"a32”, type:"mcq”, difficulty:"medium”, topic:"Muscles by Region”, q:"Which muscles are the primary movers for spinal extension?”, options:["Rectus abdominis and external obliques”,"Erector spinae”,"Quadratus lumborum only”,"Iliopsoas and psoas major”], correct:1, explanation:"The erector spinae is the primary mover for spinal extension. The deep posterior group (including multifidus) assists with local spinal extension.” },
{ id:"a33”, type:"mcq”, difficulty:"medium”, topic:"Muscles by Region”, q:"Which muscles produce ankle-foot plantar flexion?”, options:["Tibialis anterior and extensor digitorum longus”,"Gastrocnemius and soleus”,"Peroneus longus and tibialis posterior”,"Iliopsoas and rectus femoris”], correct:1, explanation:"Ankle-foot plantar flexion is primarily produced by the gastrocnemius and soleus — both inserting via the Achilles tendon into the heel (calcaneus).” },
{ id:"a34”, type:"mcq”, difficulty:"medium”, topic:"Muscles by Region”, q:"Which muscles produce ankle-foot eversion?”, options:["Tibialis anterior and tibialis posterior”,"Gastrocnemius and soleus”,"Peroneus longus and peroneus brevis”,"Extensor digitorum longus only”], correct:2, explanation:"Ankle-foot eversion is produced by the peroneus longus and peroneus brevis. Inversion is produced by the tibialis anterior and tibialis posterior.” },
{ id:"a35”, type:"mcq”, difficulty:"hard”, topic:"Muscles by Region”, q:"Which muscles produce shoulder external rotation?”, options:["Subscapularis and teres major”,"Infraspinatus and teres minor”,"Anterior deltoid and pectoralis major”,"Latissimus dorsi and posterior deltoid”], correct:1, explanation:"Shoulder external rotation is produced by the infraspinatus and teres minor — both part of the rotator cuff. Subscapularis and teres major produce internal rotation.” },
{ id:"a36”, type:"mcq”, difficulty:"hard”, topic:"Muscles by Region”, q:"Which muscles produce scapular upward rotation?”, options:["Rhomboids and levator scapulae”,"Trapezius and serratus anterior”,"Pectoralis major and subscapularis”,"Deltoid and supraspinatus”], correct:1, explanation:"Scapular upward rotation is produced by the trapezius and serratus anterior. The rhomboids and levator scapulae perform downward rotation.” },
{ id:"a37”, type:"mcq”, difficulty:"hard”, topic:"Muscles by Region”, q:"What muscles produce elbow flexion?”, options:["Triceps brachii”,"Biceps brachii and brachialis”,"Deltoid and supraspinatus”,"Infraspinatus and teres minor”], correct:1, explanation:"Elbow flexion is produced by the biceps brachii and brachialis. Elbow extension is produced by the triceps brachii.” },
{ id:"a38”, type:"mcq”, difficulty:"hard”, topic:"Muscles by Region”, q:"What is the primary action of the quadratus lumborum?”, options:["Spinal flexion”,"Spinal extension”,"Spinal lateral flexion (same side)”,"Hip flexion”], correct:2, explanation:"The quadratus lumborum is a primary mover for spinal lateral flexion on the same side. It originates on the upper pelvis and inserts on the lowest rib and lumbar vertebrae.” },
{ id:"a39”, type:"fill”, difficulty:"medium”, topic:"Muscles by Region”, q:"The anterior superior iliac spine is abbreviated as ___.”, answer:"ASIS”, hint:"A key bony landmark for assessing pelvic position”, explanation:"The ASIS, together with the pubic symphysis (PS), is used to identify neutral pelvis — when both landmarks are in the same horizontal plane when lying supine.” },
{ id:"a40”, type:"mcq”, difficulty:"hard”, topic:"Muscles by Region”, q:"Which muscles produce spinal rotation?”, options:["Rectus abdominis only”,"Erector spinae, external oblique, and internal oblique”,"Quadratus lumborum and multifidus”,"Transversus abdominis only”], correct:1, explanation:"Spinal rotation is produced by the erector spinae, external oblique, and internal oblique. The external obliques rotate to the opposite side; the internal obliques rotate to the same side.” },
{ id:"a41”, type:"mcq”, difficulty:"medium”, topic:"Posture”, q:"Lumbar hyperlordosis is associated with which muscle imbalance?”, options:["Strong abdominals and flexible hip flexors”,"Weak abdominals, tight hip flexors, and tight lower back extensors”,"Weak glutes and tight hamstrings”,"Strong erector spinae and weak quadriceps”], correct:1, explanation:"Lumbar hyperlordosis is frequently associated with weak abdominals, tight hip flexors, and tight lower back extensors. Correction focuses on strengthening the abdominals and stretching the hip flexors.” },
{ id:"a42”, type:"mcq”, difficulty:"medium”, topic:"Posture”, q:"Kyphosis involves:”, options:["An increased lumbar curve”,"An increased thoracic curve”,"A lateral curvature of the spine”,"A decrease in the normal lumbar curve”], correct:1, explanation:"Kyphosis involves an increased thoracic curve of the spine. Correction focuses on strengthening the thoracic extensors and stretching the anterior shoulder muscles.” },
{ id:"a43”, type:"mcq”, difficulty:"medium”, topic:"Posture”, q:"What characterises scoliosis?”, options:["Increased lumbar lordosis”,"Decreased thoracic curve”,"One or more lateral curvatures of the spine, usually involving rotation of the vertebrae”,"Hyperextended knees”], correct:2, explanation:"Scoliosis involves one or more lateral curvatures of the spine in the coronal plane — and usually also involves rotation of the involved vertebrae.” },
{ id:"a44”, type:"mcq”, difficulty:"hard”, topic:"Posture”, q:"Fatigue (sway back) posture is characterised by:”, options:["An increased lumbar curve and anterior pelvic tilt”,"The pelvis pushed forward and the thoracic spine shifted back relative to the plumb line”,"A decrease in the lumbar curve”,"Lateral deviation of the spine”], correct:1, explanation:"Fatigue posture is characterised by pushing the pelvis forward relative to the plumb line and the thoracic spine. It is a passive posture requiring very little energy to maintain.” },
{ id:"a45”, type:"mcq”, difficulty:"medium”, topic:"Posture”, q:"What does the plumb line represent in postural assessment?”, options:["A tool for measuring flexibility”,"A vertical reference line used to identify postural deviations from ideal alignment when viewed from the side”,"A guide for exercise sequencing”,"A measure of muscle strength”], correct:1, explanation:"The plumb line is a vertical reference line used in postural assessment. In ideal alignment, specific landmarks should fall on this line — ear lobe, shoulder joint, greater trochanter, etc.” },
{ id:"a46”, type:"mcq”, difficulty:"medium”, topic:"Muscle Types & Contractions”, q:"What is a concentric muscle contraction?”, options:["No change in muscle length”,"The muscle lengthens during contraction”,"The muscle shortens during contraction”,"Contraction against constant speed”], correct:2, explanation:"A concentric contraction is a shortening contraction — the muscle shortens and the angle of the joint decreases. An eccentric contraction is the opposite: the muscle lengthens while under tension.” },
{ id:"a47”, type:"mcq”, difficulty:"medium”, topic:"Muscle Types & Contractions”, q:"An isometric contraction is best described as:”, options:["Muscle shortening through full range”,"Muscle lengthening while under tension”,"Contraction in a static position with no change in muscle length or joint angle”,"Contraction where resistance adjusts to force”], correct:2, explanation:"An isometric contraction occurs in a static position — no change in the length of the muscle or the angle of the joint. Stabilisers typically use isometric contractions.” },
{ id:"a48”, type:"tf”, difficulty:"medium”, topic:"Muscle Types & Contractions”, q:"Tonic muscles tend toward overuse and shortening, while phasic muscles tend toward disuse and weakness.”, correct:true, explanation:"Postural (tonic) muscles tend toward overuse and shortening, whereas phasic muscles tend toward disuse and weakness. This imbalance can limit range of motion and inhibit antagonist function.” },
{ id:"a49”, type:"mcq”, difficulty:"hard”, topic:"Muscle Types & Contractions”, q:"What is the difference between an agonist and an antagonist?”, options:["Agonist stabilises; antagonist moves”,"Agonist is the principal muscle in a movement; antagonist is the muscle with the opposite action”,"Agonist is always the stronger muscle”,"They are synonyms”], correct:1, explanation:"The agonist is the principal muscle in a movement. The antagonist has the opposite action. A synergist neutralises undesired actions, and a stabiliser anchors or supports a body part.” },
{ id:"a50”, type:"mcq”, difficulty:"medium”, topic:"Muscle Types & Contractions”, q:"What is co-contraction?”, options:["Two exercises performed together”,"Simultaneous contraction of the agonist and antagonist to produce a stable joint or balanced movement”,"Only the stabilisers contracting”,"Contracting a muscle eccentrically”], correct:1, explanation:"Co-contraction is the simultaneous contraction of the agonist and antagonist to produce a stable joint or balanced movement. It is often encouraged in Pilates to create joint stability.” },
];

// ─── MAT EXERCISES ───────────────────────────────────────────────────────────
const MAT = [
{ id:"m1”, type:"mcq”, difficulty:"easy”, theme:"Setup”, level:"Foundation”, q:"What is the starting position for Pelvic Curl?”, options:["Lying prone, arms by sides”,"Lying supine, knees bent, feet flat, legs parallel, arms by sides”,"Sitting upright, legs straight”,"Kneeling in quadruped”], correct:1, explanation:"Pelvic Curl starts lying supine with knees bent, feet flat on the mat, legs parallel, and arms by the sides in neutral spine.” },
{ id:"m2”, type:"mcq”, difficulty:"easy”, theme:"Setup”, level:"Foundation”, q:"What is the arm position in Spine Twist Supine?”, options:["Arms overhead, palms facing up”,"Out in a T position, palms facing up”,"By the sides”,"Crossed over the chest”], correct:1, explanation:"In Spine Twist Supine, arms are out in a T position with palms facing up. This anchors the upper body and allows rotation to come purely from the spine.” },
{ id:"m3”, type:"mcq”, difficulty:"easy”, theme:"Setup”, level:"Foundation”, q:"What is the starting position for Chest Lift?”, options:["Lying supine, neutral spine, knees bent, feet hip-width apart, fingers interlaced behind the head”,"Lying prone, hands by temples”,"Sitting upright, legs bent”,"Lying supine, legs straight”], correct:0, explanation:"Chest Lift starts lying supine in neutral spine, knees bent, feet hip-width apart, with fingers interlaced behind the head.” },
{ id:"m4”, type:"mcq”, difficulty:"easy”, theme:"Setup”, level:"Foundation”, q:"What is the starting position for Single Leg Lift?”, options:["Lying supine, neutral spine, knees bent, feet flat, arms by sides”,"Lying prone, arms overhead”,"Sitting upright”,"Lying supine, legs straight”], correct:0, explanation:"Single Leg Lift starts lying supine in neutral spine, knees bent, feet flat on the mat, arms by the sides.” },
{ id:"m5”, type:"mcq”, difficulty:"easy”, theme:"Setup”, level:"Foundation”, q:"What is the setup for Rest Position?”, options:["Lying supine, arms overhead”,"From kneeling, hips back toward heels, trunk folded forward over thighs, arms extended overhead or resting by sides”,"Sitting cross-legged”,"Lying prone, head resting on hands”], correct:1, explanation:"Rest Position: from kneeling, sit the hips back toward the heels, fold the trunk forward over the thighs, with arms extended overhead or resting by the sides.” },
{ id:"m6”, type:"mcq”, difficulty:"easy”, theme:"Setup”, level:"Foundation”, q:"What is the arm position for Roll-Up?”, options:["Arms by the sides”,"Arms in T position”,"Arms reaching overhead, palms facing each other, not touching the floor”,"Hands interlaced behind the head”], correct:2, explanation:"Roll-Up begins lying supine with arms reaching overhead, palms facing each other. The arms are not on the floor — they are aligned with the shoulders.” },
{ id:"m7”, type:"mcq”, difficulty:"easy”, theme:"Setup”, level:"Foundation”, q:"What is the starting position for Leg Circles?”, options:["Both legs in tabletop”,"One leg straight up to the ceiling (dorsiflexed), other leg straight on the mat (plantarflexed), arms by sides or in T”,"Both legs straight on the mat”,"One leg up, other leg bent, foot flat”], correct:1, explanation:"Leg Circles: one leg straight up to the ceiling (dorsiflexed), other leg straight on the mat (plantarflexed), arms by sides or in T position.” },
{ id:"m8”, type:"mcq”, difficulty:"easy”, theme:"Setup”, level:"Foundation”, q:"What is the starting position for Roll-Like-a-Ball?”, options:["Sitting upright, legs straight”,"Sitting in balanced position, body in ball shape, legs bent, hands on shins close to ankles, feet off the mat”,"Lying supine in C-curve”,"Kneeling with arms forward”], correct:1, explanation:"Roll-Like-a-Ball: sitting in a balanced position with the body in a ball shape, legs bent, hands on shins close to the ankles, feet off the mat.” },
{ id:"m9”, type:"mcq”, difficulty:"easy”, theme:"Setup”, level:"Foundation”, q:"What is the starting position for Spine Stretch Forward?”, options:["Lying supine, arms overhead”,"Sitting upright, legs straight, feet dorsiflexed shoulder-width apart, arms reaching forward parallel to mat, palms facing each other”,"Sitting cross-legged”,"Kneeling upright”], correct:1, explanation:"Spine Stretch Forward: sitting upright, legs straight, feet dorsiflexed shoulder-width apart, arms reaching forward parallel to the mat, palms facing each other.” },
{ id:"m10”, type:"mcq”, difficulty:"easy”, theme:"Setup”, level:"Foundation”, q:"What is the setup for Back Extension (prone)?”, options:["Lying prone, trunk lifted, arms bent under shoulders”,"Lying prone, head aligned with spine, arms straight and by sides pressing against legs”,"Lying prone, arms overhead”,"Kneeling, arms by sides”], correct:1, explanation:"Back Extension: lying prone with head aligned with the spine, arms straight and by sides pressing against the legs.” },
{ id:"m11”, type:"tf”, difficulty:"easy”, theme:"Breathing”, level:"Foundation”, q:"In Pelvic Curl, you exhale to roll the spine UP off the mat.”, correct:true, explanation:"Exhale to draw the abdominals in and initiate the posterior pelvic tilt rolling the spine up. Inhale at the top, exhale to roll back down vertebra by vertebra.” },
{ id:"m12”, type:"tf”, difficulty:"easy”, theme:"Breathing”, level:"Foundation”, q:"In Spine Twist Supine, you inhale as the legs lower to one side.”, correct:true, explanation:"Inhale as the legs lower to one side, exhale to bring them back to center — the exhale uses the obliques to return, reinforcing core control.” },
{ id:"m13”, type:"mcq”, difficulty:"easy”, theme:"Breathing”, level:"Foundation”, q:"In Chest Lift, which breath is used to lift the head and chest?”, options:["Inhale”,"Exhale”,"Hold the breath”,"Either breath works”], correct:1, explanation:"In Chest Lift, exhale to lift the head and chest — the exhale supports abdominal engagement during the effort phase. Inhale to pause at the top.” },
{ id:"m14”, type:"mcq”, difficulty:"medium”, theme:"Breathing”, level:"Foundation”, q:"In Roll-Up, what is the correct breathing sequence?”, options:["Exhale up, exhale down”,"Inhale to lift arms and begin, exhale to roll up; inhale to pause; exhale to roll back down”,"Inhale throughout”,"Hold breath on the way up”], correct:1, explanation:"In Roll-Up: inhale to lift the arms up and forward then the head and chest; exhale to roll up until eyes are over the knees; inhale to pause; exhale to roll back down.” },
{ id:"m15”, type:"mcq”, difficulty:"easy”, theme:"Breathing”, level:"Foundation”, q:"In Rest Position, what happens with the breath?”, options:["Into the front of the belly”,"Inhale to lengthen the spine, exhale to breathe into the back of the ribcage”,"Hold the breath”,"Breathe normally without focus”], correct:1, explanation:"In Rest Position: inhale to let the spine lengthen and release the lower back; exhale to breathe into the back of the ribcage.” },
{ id:"m16”, type:"fill”, difficulty:"easy”, theme:"Cues”, level:"Foundation”, q:"Complete the Pelvic Curl cue: ‘Peel each ___ up and down’”, answer:"vertebra”, hint:"Think of sequential spinal articulation”, explanation:”‘Peel each vertebra up and down’ encourages sequential spinal articulation rather than lifting the spine as one rigid block.” },
{ id:"m17”, type:"mcq”, difficulty:"medium”, theme:"Cues”, level:"Foundation”, q:"In Spine Twist Supine, which cue addresses the most common compensation?”, options:[”‘Squeeze your glutes at the top’”,”‘Twist from the spine/waist — not from the pelvis. The hips should not go to your ribs.’”,”‘Keep your arms pressing into the mat’”,”‘Look toward the ceiling throughout’”], correct:1, explanation:"The most common compensation is the pelvis lifting or rotating. The key cue: ‘twist from the spine/waist — the hips should not go to your ribs.’” },
{ id:"m18”, type:"mcq”, difficulty:"easy”, theme:"Cues”, level:"Foundation”, q:"In Chest Lift, what does ‘lift the abdominals rather than the neck’ address?”, options:["Getting the chest higher”,"Preventing neck tension by redirecting effort to the core”,"Keeping the legs still”,"Maintaining neutral pelvis”], correct:1, explanation:”‘Lift the abdominals rather than the neck’ redirects effort away from straining the neck and toward using the abdominals — directly addressing the most common compensation.” },
{ id:"m19”, type:"mcq”, difficulty:"medium”, theme:"Cues”, level:"Foundation”, q:"In Chest Lift with Rotation, ‘head, shoulder and chest move as one unit’ prevents which error?”, options:["The pelvis moving”,"The elbow leading the rotation”,"The legs lifting”,"The lower back arching”], correct:1, explanation:"This cue prevents the elbow pulling the rotation — instead the entire upper body (head, shoulder, chest) rotates as one connected block, maintaining consistent trunk height.” },
{ id:"m20”, type:"mcq”, difficulty:"easy”, theme:"Cues”, level:"Foundation”, q:"What imagery cue is used in Side Lifts to feel the lateral flexion?”, options:[”‘Imagine a wall behind you’”,”‘Think of a blueberry between your waist and the mat — when you lift, pop it’”,”‘Reach the top of your head to the ceiling’”,”‘Melt your ribs toward the mat’”], correct:1, explanation:”‘Think like you have a blueberry between your waist and the mat — when you lift, you want to pop that blueberry.’ This directs attention precisely to the working side of the waist.” },
{ id:"m21”, type:"fill”, difficulty:"medium”, theme:"Cues”, level:"Foundation”, q:"In Roll-Up, the cue ‘find your ___ at the top’ describes the shape of the spine.”, answer:"C-shape / C-curve”, hint:"Imagine curving over a ball”, explanation:”‘Find your C-shape at the top’ — the spine is in a C-curve at the peak of the Roll-Up. Imagine going over a ball; do not lean too far forward.” },
{ id:"m22”, type:"fill”, difficulty:"easy”, theme:"Cues”, level:"Foundation”, q:"In Spine Stretch Forward, ‘imagine a ___ behind you’ helps maintain spinal length before curving.”, answer:"wall”, hint:"What structure encourages the spine to stay upright?”, explanation:”‘Imagine a wall behind you’ helps students maintain spinal length before initiating the curve — preventing collapsing forward from the start.” },
{ id:"m23”, type:"mcq”, difficulty:"easy”, theme:"Muscles”, level:"Foundation”, q:"What does Pelvic Curl primarily train?”, options:["Hip flexors and quadriceps”,"Abdominals, back extensors, glutes, hamstrings, and spinal articulation”,"Shoulder stability”,"Lateral flexors only”], correct:1, explanation:"Pelvic Curl trains the abdominals and obliques, back extensors, glutes and hamstrings, and develops spinal articulation.” },
{ id:"m24”, type:"mcq”, difficulty:"easy”, theme:"Muscles”, level:"Foundation”, q:"What is the primary focus of Single Leg Lift?”, options:["Strengthening the quadriceps”,"Hip flexor control and disassociation while maintaining a completely neutral pelvis”,"Spinal articulation”,"Shoulder stability”], correct:1, explanation:"Single Leg Lift develops hip flexor control and disassociation — the ability to move one leg independently while keeping the pelvis completely neutral.” },
{ id:"m25”, type:"fill”, difficulty:"easy”, theme:"Muscles”, level:"Foundation”, q:"In Single Leg Lift, the movement comes from the ___ joint only.”, answer:"hip”, hint:"Where the leg connects to the pelvis”, explanation:"The movement comes from the hip joint only. The pelvis stays completely neutral and nothing else moves.” },
{ id:"m26”, type:"mcq”, difficulty:"medium”, theme:"Muscles”, level:"Foundation”, q:"What does Chest Lift primarily train?”, options:["Hip flexors and quadriceps”,"Abdominals, obliques, and pelvic/lumbar stability”,"Shoulder stability”,"Spinal extension”], correct:1, explanation:"Chest Lift primarily trains the abdominals and obliques, along with pelvic and lumbar stability.” },
{ id:"m27”, type:"mcq”, difficulty:"medium”, theme:"Muscles”, level:"Foundation”, q:"What does Spine Twist Supine primarily train?”, options:["Back extensors and hamstrings”,"Abdominals, obliques, hip flexors, pelvic and lumbar stability”,"Shoulder mobility”,"Hip abductors”], correct:1, explanation:"Spine Twist Supine trains the abdominals and obliques (especially spinal rotators), hip flexors, and pelvic and lumbar stability.” },
{ id:"m28”, type:"mcq”, difficulty:"easy”, theme:"Modifications”, level:"Foundation”, q:"What is a good modification for a student with tight hamstrings in Spine Stretch Forward?”, options:["Skip the exercise”,"Have them sit on a folded blanket to allow an anterior pelvic tilt”,"Ask them to force the stretch”,"Bend both knees wide”], correct:1, explanation:"Sitting on a folded blanket elevates the pelvis and allows an anterior tilt, reducing hamstring tension so the student can access spinal flexion without lumbar compensation.” },
{ id:"m29”, type:"tf”, difficulty:"easy”, theme:"Modifications”, level:"Foundation”, q:"For a beginner with neck tension in Chest Lift, cueing them to support the head with their hands is an appropriate modification.”, correct:true, explanation:"Letting the hands support the weight of the head reduces neck tension. The cue ‘nod the chin slightly and let the hands support the weight of the head’ directly addresses this.” },
{ id:"m30”, type:"mcq”, difficulty:"easy”, theme:"Setup”, level:"Intermediate”, q:"What is the starting position for Double Leg Stretch?”, options:["Legs straight on the mat”,"Legs in tabletop, shins parallel to mat, hands on knees, trunk in Chest Lift”,"Legs perpendicular to the mat”,"Legs crossed at the ankles”], correct:1, explanation:"Double Leg Stretch starts with both legs in tabletop (shins parallel to mat), hands resting on the knees, and the trunk already in Chest Lift position.” },
{ id:"m31”, type:"mcq”, difficulty:"easy”, theme:"Setup”, level:"Intermediate”, q:"In Single Leg Stretch, which hand goes to the outside of the knee?”, options:["The hand closest to the body (inside hand)”,"The hand furthest from the body (outside hand)”,"Both hands hold the shin”,"Both hands behind the head”], correct:1, explanation:"The outside hand goes to the outside of the knee, and the inside hand holds the ankle of the bent leg. This protects the knee joint.” },
{ id:"m32”, type:"mcq”, difficulty:"medium”, theme:"Setup”, level:"Intermediate”, q:"What is the setup for Single Leg Kick?”, options:["Lying supine, legs in tabletop”,"Lying prone, trunk lifted, arms bent, elbows under shoulders, fingers interlaced, legs straight and together lifted off mat”,"Lying prone, arms overhead”,"Sitting upright”], correct:1, explanation:"Single Leg Kick: lying prone with trunk lifted, arms bent, elbows directly under shoulders, fingers interlaced, legs straight and together, slightly lifted off the mat.” },
{ id:"m33”, type:"mcq”, difficulty:"medium”, theme:"Setup”, level:"Intermediate”, q:"What is the setup for the Saw?”, options:["Lying supine, arms in T”,"Sitting upright, legs straight, feet dorsiflexed wider than shoulder-width, arms in T position, palms facing forward”,"Sitting cross-legged”,"Lying prone”], correct:1, explanation:"Saw: sitting upright, legs straight, feet dorsiflexed wider than shoulder-width, arms in T position, palms facing forward.” },
{ id:"m34”, type:"mcq”, difficulty:"medium”, theme:"Setup”, level:"Intermediate”, q:"What is the starting position for Hundred Prep?”, options:["Legs straight on the mat”,"Lying supine, both legs in tabletop, arms reaching overhead with palms facing up”,"Legs straight up to the ceiling”,"One leg in tabletop, one straight”], correct:1, explanation:"Hundred Prep: lying supine with both legs in tabletop (hips and knees at approximately 90 degrees), arms reaching overhead with palms facing up.” },
{ id:"m35”, type:"mcq”, difficulty:"medium”, theme:"Setup”, level:"Intermediate”, q:"What is the setup for Back Support?”, options:["Lying supine, arms by sides”,"Sitting, arms straight behind pelvis, fingers pointing toward feet, legs straight and parallel, feet plantarflexed”,"Kneeling, arms overhead”,"Standing, arms in T”], correct:1, explanation:"Back Support: sitting with arms straight behind the pelvis, hands on the mat with fingers facing toward the feet, legs straight and parallel, feet plantarflexed.” },
{ id:"m36”, type:"mcq”, difficulty:"medium”, theme:"Breathing”, level:"Intermediate”, q:"In the Hundred, what is the breathing pattern?”, options:["Hold breath for 10 counts”,"Exhale for 10, inhale for 10”,"5 counts inhale pumping, 5 counts exhale pumping — repeated for 10 cycles”,"Breathe naturally”], correct:2, explanation:"In the Hundred, the arms pump with 5 counts inhale and 5 counts exhale, repeated for 10 breath cycles — totalling 100 arm pumps. That is how the exercise gets its name.” },
{ id:"m37”, type:"mcq”, difficulty:"medium”, theme:"Breathing”, level:"Intermediate”, q:"In the Saw, what is the correct breath sequence?”, options:["Exhale to rotate, inhale to reach”,"Inhale to rotate from the waist (flat back), exhale to reach the arms forward”,"Hold breath throughout”,"Inhale and exhale both on the rotation”], correct:1, explanation:"In the Saw: inhale and twist from the waist with a flat back, then exhale to reach the arms forward. The exhale deepens the rotation and reach.” },
{ id:"m38”, type:"tf”, difficulty:"medium”, theme:"Cues”, level:"Intermediate”, q:"In Corkscrew, the primary goal is to achieve the greatest range of motion and go as low as possible.”, correct:false, explanation:"The goal of Corkscrew is NOT range or how low you go — the goal is control. There should be no movement in the lumbar spine. The half circle is described as ‘like a smiley.’” },
{ id:"m39”, type:"mcq”, difficulty:"medium”, theme:"Cues”, level:"Intermediate”, q:"In Roll-Like-a-Ball, where should the head be during the roll?”, options:["Touching the mat on each roll”,"Neutral, facing the ceiling”,"In line with the C-curved spine — the head does NOT touch the floor”,"Extended back”], correct:2, explanation:"The head does NOT touch the floor in Roll-Like-a-Ball. It stays in line with the C-curved spine. Cue: ‘keep the skull in the same shape as the spine.’” },
{ id:"m40”, type:"mcq”, difficulty:"medium”, theme:"Cues”, level:"Intermediate”, q:"In Spine Twist (seated), what is the cue for the sit bones?”, options:["Lift the sit bones to rotate more”,"The sit bones stay on the floor throughout”,"Tuck the pelvis under”,"Let the hips shift to one side”], correct:1, explanation:"In Spine Twist (seated), the sit bones stay on the floor throughout. The rotation comes from the waist — not the pelvis shifting.” },
{ id:"m41”, type:"mcq”, difficulty:"hard”, theme:"Cues”, level:"Intermediate”, q:"In Cat Stretch, which part of the spine initiates the flexion?”, options:["Thoracic spine first”,"Cervical spine first”,"Lumbar spine (lower back) first, then the rest follows”,"All segments simultaneously”], correct:2, explanation:"In Cat Stretch, the lumbar spine (lower back) moves into flexion first, and the rest of the spine follows. Do not overdo it in the thoracic spine.” },
{ id:"m42”, type:"mcq”, difficulty:"medium”, theme:"Muscles”, level:"Intermediate”, q:"In Single Leg Kick, the legs are lifted using which muscles?”, options:["Hip flexors”,"Quadriceps”,"Hip extensors — glutes and hamstrings”,"Adductors”], correct:2, explanation:"In Single Leg Kick, the legs are lifted using the hip extensors — the glutes and hamstrings. The abdominals support the lower back throughout.” },
{ id:"m43”, type:"mcq”, difficulty:"medium”, theme:"Muscles”, level:"Intermediate”, q:"What does Criss Cross add compared to Double Leg Stretch in terms of muscle demand?”, options:["Lateral flexion”,"Spinal rotation — trunk rotates toward the bent knee, targeting the obliques specifically”,"Hip extension”,"Shoulder flexion”], correct:1, explanation:"Criss Cross adds spinal rotation — the trunk rotates toward the bent knee while the other leg extends, specifically targeting the obliques.” },
{ id:"m44”, type:"tf”, difficulty:"medium”, theme:"Muscles”, level:"Intermediate”, q:"In Leg Circles, it is better for the working leg to be vertical even if not perfectly straight, so the abdominals work rather than just the hip flexors.”, correct:true, explanation:"It is better for the leg to be vertical even if not perfectly straight — this keeps the abdominals working. If the leg drops too low, the hip flexors dominate.” },
{ id:"m45”, type:"mcq”, difficulty:"medium”, theme:"Modifications”, level:"Intermediate”, q:"What modification can be offered if the full Hundred position is too demanding?”, options:["Skip the exercise”,"Do it standing”,"Keep legs in tabletop instead of extending them”,"Remove the arm pumps”], correct:2, explanation:"If the full Hundred is too hard, legs can remain in tabletop position. This reduces the lever arm and decreases demand on the hip flexors and lower abdominals.” },
{ id:"m46”, type:"tf”, difficulty:"medium”, theme:"Modifications”, level:"Intermediate”, q:"In Leg Circles, if a student cannot maintain pelvic stability with a fully extended leg, bending the knee slightly is an appropriate modification.”, correct:true, explanation:"Bending the knee slightly reduces the lever arm, making it easier to maintain pelvic stability. The priority is always pelvic control over range of the circle.” },
{ id:"m47”, type:"mcq”, difficulty:"hard”, theme:"Setup”, level:"Advanced”, q:"In Back Support, which way do the fingers point?”, options:["Away from the feet”,"To the sides”,"Toward the feet”,"Interlaced behind the pelvis”], correct:2, explanation:"In Back Support, hands are placed on the mat behind the pelvis with fingers pointing toward the feet. This wrist alignment safely supports the body weight as the hips lift.” },
{ id:"m48”, type:"mcq”, difficulty:"hard”, theme:"Setup”, level:"Advanced”, q:"What is the setup for Seal Puppy?”, options:["Sitting upright, legs straight”,"Sitting in balanced ball shape, legs bent, arms wrapped under legs, feet plantarflexed, palms on top of feet”,"Lying supine, legs in tabletop”,"Kneeling in quadruped”], correct:1, explanation:"Seal Puppy starts in a balanced ball shape: legs bent, arms wrapped under the legs, feet plantarflexed, palms resting on top of the feet.” },
{ id:"m49”, type:"mcq”, difficulty:"hard”, theme:"Cues”, level:"Advanced”, q:"In Back Support, what shape should the body form when the hips are fully lifted?”, options:["A curved C-shape”,"A straight diagonal line from feet to shoulders”,"A V-shape with hips highest”,"An arch with only the hips lifted”], correct:1, explanation:"In Back Support, when lifted you want a straight diagonal line from feet to shoulders. Cue: think posterior tilt and feel a nice stretch through the shoulders.” },
{ id:"m50”, type:"tf”, difficulty:"easy”, theme:"Muscles”, level:"Advanced”, q:"In Chest Lift with Rotation, the legs should remain still throughout.”, correct:true, explanation:"The legs do not move in Chest Lift with Rotation. The pelvis stays neutral, the shoulders do not move with the rotation, and only the head, shoulder, and chest rotate as one unit.” },
];

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const SECTION_CONFIG = {
history: { label:"History & Principles”, color:C.gold, emoji:"📜”, desc:"Origins of Pilates, principles, pelvis, breathing” },
anatomy: { label:"Anatomy”, color:C.sageDark, emoji:"🦴”, desc:"Planes, joints, muscles, movement terminology” },
mat: { label:"Mat Exercises”, color:C.accent, emoji:"🧘”, desc:"Setup, cues, breathing, muscles, modifications” },
};

const HISTORY_TOPICS = ["All”,"Joseph Pilates”,"The 10 Principles”,"Pelvis & Neutral Spine”,"Breathing”];
const ANATOMY_TOPICS = ["All”,"Planes & Directions”,"Joints”,"Joint Movements”,"Muscles by Region”,"Posture”,"Muscle Types & Contractions”];
const MAT_THEMES = ["All”,"Setup”,"Breathing”,"Cues”,"Muscles”,"Modifications”];
const MAT_LEVELS = ["All”,"Foundation”,"Intermediate”,"Advanced”];
const DIFF_COLORS = { easy:C.right, medium:C.gold, hard:C.wrong };

const TOPIC_COLORS_H = { "Joseph Pilates”:C.gold, "The 10 Principles”:”#7A6E9A”, "Pelvis & Neutral Spine”:C.sageDark, "Breathing”:C.accent };
const TOPIC_COLORS_A = { "Planes & Directions”:C.gold, "Joints”:”#7A6E9A”, "Joint Movements”:C.sageDark, "Muscles by Region”:C.accent, "Posture”:C.wrong, "Muscle Types & Contractions”:C.right };
const LEVEL_COLORS = { Foundation:C.right, Intermediate:C.gold, Advanced:C.wrong };

function shuffle(arr) { return […arr].sort(()=>Math.random()-0.5); }

// ─── UI COMPONENTS ───────────────────────────────────────────────────────────
function Header() {
return (
<div style={{ padding:"20px 28px 16px”, borderBottom:`1px solid ${C.sageLight}`, display:"flex”, justifyContent:"space-between”, alignItems:"baseline” }}>
<span style={{ fontFamily:"Georgia,serif”, fontStyle:"italic”, fontSize:"1rem”, color:C.sageDark, letterSpacing:"0.04em” }}>My Movement Lab</span>
<span style={{ fontSize:"0.58rem”, letterSpacing:"0.18em”, textTransform:"uppercase”, color:C.accent, fontFamily:"sans-serif”, fontWeight:300 }}>Pilates Study Tool</span>
</div>
);
}

function Tag({ children, color }) {
return <span style={{ fontSize:"0.6rem”, letterSpacing:"0.16em”, textTransform:"uppercase”, color:color||C.accent, fontFamily:"sans-serif”, fontWeight:300 }}>{children}</span>;
}

function SectionLabel({ label }) {
return <p style={{ fontSize:"0.58rem”, letterSpacing:"0.18em”, textTransform:"uppercase”, color:C.accent, fontFamily:"sans-serif”, fontWeight:300, marginBottom:8 }}>{label}</p>;
}

function Pill({ label, active, color, onClick }) {
return (
<button onClick={onClick} style={{ padding:"6px 13px”, border:`1px solid ${active?(color||C.forest):C.sageLight}`, background:active?(color||C.forest):"transparent”, cursor:"pointer”, fontFamily:"sans-serif”, fontWeight:300, fontSize:"0.62rem”, letterSpacing:"0.12em”, textTransform:"uppercase”, color:active?C.cream:C.forest, transition:"all 0.18s” }}>{label}</button>
);
}

function Btn({ children, onClick, variant="primary”, disabled, style={} }) {
const base = { border:"none”, cursor:disabled?"not-allowed”:"pointer”, fontFamily:"sans-serif”, fontWeight:300, fontSize:"0.68rem”, letterSpacing:"0.16em”, textTransform:"uppercase”, padding:"12px 28px”, transition:"all 0.18s”, opacity:disabled?0.4:1 };
const v = { primary:{ background:C.forest, color:C.cream }, ghost:{ background:"transparent”, color:C.forest, border:`1px solid ${C.sageLight}` }, sage:{ background:C.sageDark, color:C.cream } };
return <button onClick={disabled?undefined:onClick} style={{...base,...v[variant],...style}}>{children}</button>;
}

// ─── QUESTION RENDERERS ──────────────────────────────────────────────────────
function MCQ({ q, onAnswer, answered, selected }) {
return (
<div style={{ display:"flex”, flexDirection:"column”, gap:9 }}>
{q.options.map((opt,i)=>{
let bc=C.sageLight, bg="transparent”, col=C.forest;
if(answered){ if(i===q.correct){bc=C.right;bg="rgba(106,155,122,0.12)”;col=C.right;}else if(i===selected){bc=C.wrong;bg="rgba(193,122,111,0.1)”;col=C.wrong;} }
return <button key={i} onClick={()=>!answered&&onAnswer(i)} disabled={answered} style={{ border:`1px solid ${bc}`, background:bg, color:col, padding:"13px 16px”, textAlign:"left”, cursor:answered?"default”:"pointer”, fontFamily:"sans-serif”, fontWeight:300, fontSize:"0.78rem”, transition:"all 0.18s” }}>{opt}</button>;
})}
</div>
);
}

function TF({ q, onAnswer, answered, selected }) {
return (
<div style={{ display:"flex”, gap:12 }}>
{[true,false].map(val=>{
let bc=C.sageLight, bg="transparent”, col=C.forest;
if(answered){ if(val===q.correct){bc=C.right;bg="rgba(106,155,122,0.12)”;col=C.right;}else if(val===selected){bc=C.wrong;bg="rgba(193,122,111,0.1)”;col=C.wrong;} }
return <button key={String(val)} onClick={()=>!answered&&onAnswer(val)} disabled={answered} style={{ flex:1, border:`1px solid ${bc}`, background:bg, color:col, padding:"18px”, cursor:answered?"default”:"pointer”, fontFamily:"Georgia,serif”, fontStyle:"italic”, fontSize:"1.1rem”, transition:"all 0.18s” }}>{val?"True”:"False”}</button>;
})}
</div>
);
}

function Flashcard({ q, onAnswer, answered }) {
const [flipped, setFlipped] = useState(false);
return (
<div>
<div onClick={()=>setFlipped(f=>!f)} style={{ border:`1px solid ${flipped?C.sageDark:C.sageLight}`, background:flipped?"rgba(90,110,88,0.06)”:"transparent”, padding:"28px 22px”, cursor:"pointer”, minHeight:110, display:"flex”, alignItems:"center”, justifyContent:"center”, transition:"all 0.25s”, marginBottom:14 }}>
<p style={{ fontFamily:"Georgia,serif”, fontStyle:"italic”, textAlign:"center”, fontSize:flipped?"0.88rem”:"0.98rem”, lineHeight:1.65, color:C.forest }}>{flipped?q.answer:"Tap to reveal the answer →”}</p>
</div>
{!answered&&flipped&&(
<div style={{ display:"flex”, gap:10 }}>
<Btn onClick={()=>onAnswer(false)} variant="ghost” style={{flex:1}}>Didn’t know it</Btn>
<Btn onClick={()=>onAnswer(true)} variant="sage” style={{flex:1}}>Got it ✓</Btn>
</div>
)}
</div>
);
}

function Fill({ q, onAnswer, answered, input, setInput }) {
return (
<div>
{q.hint&&<p style={{ fontSize:"0.65rem”, color:C.accent, fontFamily:"sans-serif”, fontWeight:300, letterSpacing:"0.08em”, marginBottom:10 }}>Hint: {q.hint}</p>}
<input disabled={answered} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter”&&!answered&&input.trim()&&onAnswer(input)} placeholder="Type your answer…” style={{ width:"100%”, padding:"13px 14px”, border:`1px solid ${C.sageLight}`, background:"transparent”, fontFamily:"sans-serif”, fontWeight:300, fontSize:"0.78rem”, color:C.forest, outline:"none”, marginBottom:10, boxSizing:"border-box” }}/>
{!answered&&<Btn onClick={()=>input.trim()&&onAnswer(input)} disabled={!input.trim()}>Check →</Btn>}
{answered&&<div style={{ padding:"11px 14px”, border:`1px solid ${C.right}`, background:"rgba(106,155,122,0.1)”, fontSize:"0.75rem”, color:C.right, fontFamily:"sans-serif”, fontWeight:300, marginTop:8 }}>✓ Model answer: {q.answer}</div>}
</div>
);
}

// ─── HOME ────────────────────────────────────────────────────────────────────
function Home({ onStart }) {
const [section, setSection] = useState("history”);
const [difficulty, setDifficulty] = useState("all”);
const [historyTopic, setHistoryTopic] = useState("All”);
const [anatomyTopic, setAnatomyTopic] = useState("All”);
const [matTheme, setMatTheme] = useState("All”);
const [matLevel, setMatLevel] = useState("All”);

function getPool() {
if(section==="history”) {
let p = historyTopic==="All” ? HISTORY : HISTORY.filter(q=>q.topic===historyTopic);
return difficulty==="all” ? p : p.filter(q=>q.difficulty===difficulty);
}
if(section==="anatomy”) {
let p = anatomyTopic==="All” ? ANATOMY : ANATOMY.filter(q=>q.topic===anatomyTopic);
return difficulty==="all” ? p : p.filter(q=>q.difficulty===difficulty);
}
return MAT.filter(q=>{
const tm = matTheme==="All” || q.theme===matTheme;
const lm = matLevel==="All” || q.level===matLevel;
return tm && lm;
});
}

const pool = getPool();

return (
<div style={{ maxWidth:620, margin:"0 auto”, padding:"48px 24px 40px” }}>
<Tag>Pilates Study Tool</Tag>
<h1 style={{ fontFamily:"Georgia,serif”, fontStyle:"italic”, fontWeight:300, fontSize:"clamp(1.9rem,5vw,3rem)”, lineHeight:1.1, color:C.forest, margin:"12px 0 14px” }}>
Study smarter,<br/><span style={{color:C.sageDark}}>teach better.</span>
</h1>
<p style={{ fontSize:"0.76rem”, lineHeight:1.9, color:C.sageDark, maxWidth:420, marginBottom:36, fontFamily:"sans-serif”, fontWeight:300 }}>
Because knowing <em>why</em> makes you a better teacher — wherever you are in your journey.
</p>

```
  {/* Section selector */}
  <SectionLabel label="Choose a section" />
  <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:28 }}>
    {Object.entries(SECTION_CONFIG).map(([key,cfg])=>(
      <button key={key} onClick={()=>setSection(key)} style={{ border:`1px solid ${section===key?cfg.color:C.sageLight}`, background:section===key?"rgba(90,110,88,0.06)":"transparent", padding:"14px 18px", textAlign:"left", cursor:"pointer", transition:"all 0.18s" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:"0.96rem", color:section===key?cfg.color:C.forest }}>{cfg.emoji} {cfg.label}</span>
          <Tag color={C.accent}>{(section==="history"?HISTORY:section==="anatomy"?ANATOMY:MAT).length > 0 ? (key==="history"?HISTORY.length:key==="anatomy"?ANATOMY.length:MAT.length) : 0} questions</Tag>
        </div>
        <p style={{ fontSize:"0.63rem", color:C.accent, fontFamily:"sans-serif", fontWeight:300, marginTop:3, letterSpacing:"0.06em" }}>{cfg.desc}</p>
      </button>
    ))}
  </div>

  {/* History filters */}
  {section==="history" && (
    <>
      <SectionLabel label="Topic" />
      <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
        {HISTORY_TOPICS.map(t=>(
          <Pill key={t} label={t} active={historyTopic===t} color={t==="All"?C.forest:TOPIC_COLORS_H[t]} onClick={()=>setHistoryTopic(t)} />
        ))}
      </div>
      <SectionLabel label="Difficulty" />
      <div style={{ display:"flex", gap:8, marginBottom:36, flexWrap:"wrap" }}>
        {["all","easy","medium","hard"].map(d=>(
          <Pill key={d} label={d==="all"?"All levels":d} active={difficulty===d} color={d==="all"?C.forest:DIFF_COLORS[d]} onClick={()=>setDifficulty(d)} />
        ))}
      </div>
    </>
  )}

  {/* Anatomy filters */}
  {section==="anatomy" && (
    <>
      <SectionLabel label="Topic" />
      <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
        {ANATOMY_TOPICS.map(t=>(
          <Pill key={t} label={t} active={anatomyTopic===t} color={t==="All"?C.forest:TOPIC_COLORS_A[t]} onClick={()=>setAnatomyTopic(t)} />
        ))}
      </div>
      <SectionLabel label="Difficulty" />
      <div style={{ display:"flex", gap:8, marginBottom:36, flexWrap:"wrap" }}>
        {["all","easy","medium","hard"].map(d=>(
          <Pill key={d} label={d==="all"?"All levels":d} active={difficulty===d} color={d==="all"?C.forest:DIFF_COLORS[d]} onClick={()=>setDifficulty(d)} />
        ))}
      </div>
    </>
  )}

  {/* Mat filters */}
  {section==="mat" && (
    <>
      <SectionLabel label="Theme" />
      <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
        {MAT_THEMES.map(t=>(
          <Pill key={t} label={t} active={matTheme===t} color={C.accent} onClick={()=>setMatTheme(t)} />
        ))}
      </div>
      <SectionLabel label="Exercise level" />
      <div style={{ display:"flex", gap:8, marginBottom:36, flexWrap:"wrap" }}>
        {MAT_LEVELS.map(l=>(
          <Pill key={l} label={l} active={matLevel===l} color={l==="All"?C.forest:LEVEL_COLORS[l]} onClick={()=>setMatLevel(l)} />
        ))}
      </div>
    </>
  )}

  <div style={{ display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
    <Btn onClick={()=>onStart({ section, difficulty, historyTopic, anatomyTopic, matTheme, matLevel, pool })} disabled={pool.length===0}>
      Begin {pool.length} question{pool.length!==1?"s":""} →
    </Btn>
    {pool.length===0&&<Tag color={C.wrong}>No questions match this combination</Tag>}
  </div>
</div>
```

);
}

// ─── QUIZ ────────────────────────────────────────────────────────────────────
function Quiz({ questions, config, onDone }) {
const [idx, setIdx] = useState(0);
const [answered, setAnswered] = useState(false);
const [selected, setSelected] = useState(null);
const [input, setInput] = useState(””);
const [score, setScore] = useState(0);
const q = questions[idx];
const total = questions.length;
const cfg = SECTION_CONFIG[config.section];
const typeLabel = { mcq:"Multiple Choice”, tf:"True / False”, flashcard:"Flashcard”, fill:"Fill in the Blank” };

function handleAnswer(val) {
if(answered) return;
setSelected(val); setAnswered(true);
const correct = q.type==="fill” ? val.toLowerCase().trim().includes(q.answer.toLowerCase().split(”/”)[0].trim().toLowerCase()) : q.type==="flashcard” ? val===true : val===q.correct;
if(correct) setScore(s=>s+1);
}

function next() {
if(idx+1>=total){ onDone(score, total); return; }
setIdx(i=>i+1); setAnswered(false); setSelected(null); setInput(””);
}

const tagColor = config.section==="mat”
? (q.level ? LEVEL_COLORS[q.level] : C.accent)
: DIFF_COLORS[q.difficulty] || C.accent;
const tagLabel = config.section==="mat” ? q.level : q.difficulty;
const topicTag = config.section==="history” ? q.topic : config.section==="anatomy” ? q.topic : q.theme;

return (
<div style={{ maxWidth:620, margin:"0 auto”, padding:"32px 24px 40px” }}>
<div style={{ width:"100%”, height:2, background:C.sageLight, marginBottom:32 }}>
<div style={{ height:"100%”, background:cfg.color, width:`${(idx/total)*100}%`, transition:"width 0.4s ease” }}/>
</div>
<div style={{ display:"flex”, justifyContent:"space-between”, alignItems:"center”, marginBottom:24, flexWrap:"wrap”, gap:8 }}>
<div style={{ display:"flex”, gap:8, alignItems:"center”, flexWrap:"wrap” }}>
<Tag color={cfg.color}>{cfg.label}</Tag>
{topicTag && <><Tag color={C.sageLight}>·</Tag><Tag color={cfg.color}>{topicTag}</Tag></>}
{tagLabel && <><Tag color={C.sageLight}>·</Tag><Tag color={tagColor}>{tagLabel}</Tag></>}
</div>
<div style={{ display:"flex”, gap:8 }}>
<Tag>{typeLabel[q.type]}</Tag>
<Tag>{idx+1} / {total}</Tag>
</div>
</div>
<p style={{ fontFamily:"Georgia,serif”, fontStyle:"italic”, fontSize:"clamp(1.05rem,2.8vw,1.5rem)”, lineHeight:1.45, color:C.forest, marginBottom:26, minHeight:56 }}>{q.q}</p>
{q.type==="mcq”&&<MCQ q={q} onAnswer={handleAnswer} answered={answered} selected={selected}/>}
{q.type==="tf”&&<TF q={q} onAnswer={handleAnswer} answered={answered} selected={selected}/>}
{q.type==="flashcard”&&<Flashcard q={q} onAnswer={handleAnswer} answered={answered}/>}
{q.type==="fill”&&<Fill q={q} onAnswer={handleAnswer} answered={answered} input={input} setInput={setInput}/>}
{answered&&(
<div style={{ marginTop:18, padding:"13px 16px”, borderLeft:`2px solid ${cfg.color}`, background:"rgba(90,110,88,0.05)”, fontSize:"0.73rem”, lineHeight:1.75, color:C.forest, fontFamily:"sans-serif”, fontWeight:300 }}>{q.explanation}</div>
)}
{answered&&(
<div style={{ display:"flex”, justifyContent:"flex-end”, marginTop:22 }}>
<Btn onClick={next}>{idx+1>=total?"See results →”:"Next →”}</Btn>
</div>
)}
</div>
);
}

// ─── RESULTS ─────────────────────────────────────────────────────────────────
function Results({ score, total, section, onRetry, onHome }) {
const pct = score/total;
const cfg = SECTION_CONFIG[section];
const msg = pct===1?"Perfect score. You know this inside out.”:pct>=0.8?"Really strong. Almost there.”:pct>=0.6?"Good foundation. Focus on what you missed.”:"Keep going — every attempt builds your understanding.”;
return (
<div style={{ maxWidth:480, margin:"0 auto”, padding:"56px 24px 40px” }}>
<Tag color={cfg.color}>{cfg.label} · Complete</Tag>
<div style={{ fontFamily:"Georgia,serif”, fontStyle:"italic”, fontSize:"clamp(3rem,10vw,5rem)”, lineHeight:1, color:cfg.color, margin:"12px 0 6px” }}>{score}/{total}</div>
<p style={{ fontSize:"0.68rem”, letterSpacing:"0.1em”, color:C.forest, fontFamily:"sans-serif”, fontWeight:300, marginBottom:28 }}>correct answers</p>
<p style={{ fontFamily:"Georgia,serif”, fontStyle:"italic”, fontSize:"1.15rem”, color:C.forest, lineHeight:1.55, marginBottom:40, maxWidth:320 }}>{msg}</p>
<div style={{ display:"flex”, gap:12, flexWrap:"wrap” }}>
<Btn onClick={onRetry}>Retry</Btn>
<Btn onClick={onHome} variant="ghost">Choose another section</Btn>
</div>
</div>
);
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
const [screen, setScreen] = useState("home”);
const [questions, setQuestions] = useState([]);
const [quizConfig, setQuizConfig] = useState({});
const [finalScore, setFinalScore] = useState(0);
const [finalTotal, setFinalTotal] = useState(0);

function startQuiz(config) {
setQuestions(shuffle(config.pool));
setQuizConfig(config);
setScreen("quiz”);
}

return (
<div style={{ minHeight:"100vh”, background:C.cream, display:"flex”, flexDirection:"column” }}>
<Header/>
<div style={{ flex:1 }}>
{screen==="home”&&<Home onStart={startQuiz}/>}
{screen==="quiz”&&<Quiz questions={questions} config={quizConfig} onDone={(s,t)=>{ setFinalScore(s); setFinalTotal(t); setScreen("results”); }}/>}
{screen==="results”&&<Results score={finalScore} total={finalTotal} section={quizConfig.section} onRetry={()=>startQuiz(quizConfig)} onHome={()=>setScreen("home”)}/>}
</div>
<div style={{ padding:"14px 28px”, borderTop:`1px solid ${C.sageLight}`, display:"flex”, justifyContent:"space-between” }}>
<span style={{ fontFamily:"Georgia,serif”, fontStyle:"italic”, fontSize:"0.8rem”, color:C.accent }}>My Movement Lab</span>
<span style={{ fontSize:"0.56rem”, letterSpacing:"0.1em”, color:C.sageLight, fontFamily:"sans-serif” }}>@mymovementlab</span>
</div>
</div>
);
}


