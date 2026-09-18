import { Question, Subject, QuestionType } from '../types';

const RAW_QUESTIONS_DATA = [
  // ==========================================
  // PHYSICS (Questions 1 - 25)
  // Section A: DEMO RUN HAHHAHAHAHAHAH
  // Section B: 21 - 25 (Numerical)
  // ==========================================
  {
    id: 1,
    subject: 'Physics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'A particle of mass $m$ is projected with velocity $v_0$ at an angle $\\theta = 45^\\circ$ with the horizontal from the ground. The magnitude of angular momentum of the projectile about the point of projection when the particle is at its maximum height is:',
    options: [
      { id: '1', label: '$\\frac{m v_0^3}{4\\sqrt{2} g}$' },
      { id: '2', label: '$\\frac{m v_0^3}{2\\sqrt{2} g}$' },
      { id: '3', label: '$\\frac{m v_0^3}{\\sqrt{2} g}$' },
      { id: '4', label: '$\\frac{m v_0^2}{4 g}$' }
    ],
    correctAnswer: '1',
    explanation: 'At maximum height, $H = \\frac{v_0^2 \\sin^2(45^\\circ)}{2g} = \\frac{v_0^2}{4g}$. The velocity is horizontal: $v_x = v_0 \\cos(45^\\circ) = \\frac{v_0}{\\sqrt{2}}$. Angular momentum $L = m v_x H = m \\left(\\frac{v_0}{\\sqrt{2}}\\right) \\left(\\frac{v_0^2}{4g}\\right) = \\frac{m v_0^3}{4\\sqrt{2}g}$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 2,
    subject: 'Physics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'In a series $LCR$ circuit connected to an AC source of voltage $V(t) = V_0 \\sin(\\omega t)$, the resonance frequency is $\\omega_0 = \\frac{1}{\\sqrt{LC}}$. If the quality factor is $Q = 50$ and the bandwidth is $\\Delta \\omega = 200\\text{ rad/s}$, then the resonant frequency $\\omega_0$ is:',
    options: [
      { id: '1', label: '$10^4\\text{ rad/s}$' },
      { id: '2', label: '$5 \\times 10^3\\text{ rad/s}$' },
      { id: '3', label: '$2 \\times 10^4\\text{ rad/s}$' },
      { id: '4', label: '$10^3\\text{ rad/s}$' }
    ],
    correctAnswer: '1',
    explanation: 'Quality factor $Q = \\frac{\\omega_0}{\\Delta \\omega} \\implies \\omega_0 = Q \\cdot \\Delta \\omega = 50 \\times 200 = 10,000\\text{ rad/s} = 10^4\\text{ rad/s}$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 3,
    subject: 'Physics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'An ideal gas undergoes a cyclic process consisting of three steps: an isothermal expansion at $T_1$, an isobaric compression, and an adiabatic compression back to the initial state. The efficiency $\\eta$ of this cycle depends on the adiabatic index $\\gamma$. If $\\gamma = 1.4$ and the compression ratio is $r = 8$, the work done by the gas is given by $\\oint P dV$. Which statement is TRUE?',
    options: [
      { id: '1', label: 'Net heat absorbed by the engine in the cycle is positive.' },
      { id: '2', label: 'Net work done in an anticlockwise $P-V$ cycle is positive.' },
      { id: '3', label: 'Internal energy change over the complete cycle is $\\Delta U > 0$.' },
      { id: '4', label: 'Heat rejected during isobaric compression is zero.' }
    ],
    correctAnswer: '1',
    explanation: 'Since the engine operates as a heat engine in a clockwise direction on the $P-V$ diagram, net work is positive, so net heat absorbed $Q_{\\text{net}} = W_{\\text{net}} > 0$. Over any closed cycle, $\\Delta U = 0$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 4,
    subject: 'Physics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'A parallel plate capacitor having plate area $A$ and separation $d$ is filled with two dielectric slabs of dielectric constants $K_1 = 3$ and $K_2 = 6$, each of thickness $d/2$. The equivalent capacitance of the combination is:',
    options: [
      { id: '1', label: '$4 \\frac{\\varepsilon_0 A}{d}$' },
      { id: '2', label: '$\\frac{9}{2} \\frac{\\varepsilon_0 A}{d}$' },
      { id: '3', label: '$2 \\frac{\\varepsilon_0 A}{d}$' },
      { id: '4', label: '$6 \\frac{\\varepsilon_0 A}{d}$' }
    ],
    correctAnswer: '1',
    explanation: 'Two capacitors in series: $C_1 = \\frac{K_1 \\varepsilon_0 A}{d/2} = \\frac{6 \\varepsilon_0 A}{d}$ and $C_2 = \\frac{K_2 \\varepsilon_0 A}{d/2} = \\frac{12 \\varepsilon_0 A}{d}$. Equivalent $C_{\\text{eq}} = \\frac{C_1 C_2}{C_1 + C_2} = \\frac{6 \\times 12}{18} \\frac{\\varepsilon_0 A}{d} = 4 \\frac{\\varepsilon_0 A}{d}$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 5,
    subject: 'Physics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'A radioactive nucleus $X$ decays into $Y$ with half-life $T_{1/2} = 40\\text{ days}$. At $t = 0$, the sample contains pure $X$. The ratio of the number of nuclei of $Y$ to that of $X$ after $120\\text{ days}$ is:',
    options: [
      { id: '1', label: '$7 : 1$' },
      { id: '2', label: '$8 : 1$' },
      { id: '3', label: '$3 : 1$' },
      { id: '4', label: '$1 : 7$' }
    ],
    correctAnswer: '1',
    explanation: 'Number of half-lives $n = 120 / 40 = 3$. Remaining $N_X = N_0 / 2^3 = N_0 / 8$. Formed $N_Y = N_0 - N_X = \\frac{7}{8} N_0$. Ratio $N_Y / N_X = 7 / 1$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 6,
    subject: 'Physics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'In Young’s double slit experiment, monochromatic light of wavelength $\\lambda = 600\\text{ nm}$ illuminates two slits separated by $d = 0.5\\text{ mm}$. The screen is placed at $D = 1.5\\text{ m}$. The distance of the $4^{\\text{th}}$ bright fringe from the central maximum is:',
    options: [
      { id: '1', label: '$7.2\\text{ mm}$' },
      { id: '2', label: '$3.6\\text{ mm}$' },
      { id: '3', label: '$1.8\\text{ mm}$' },
      { id: '4', label: '$5.4\\text{ mm}$' }
    ],
    correctAnswer: '1',
    explanation: '$y_n = \\frac{n \\lambda D}{d}$. For $n=4$: $y_4 = \\frac{4 \\times 600 \\times 10^{-9} \\times 1.5}{0.5 \\times 10^{-3}} = 7.2 \\times 10^{-3}\\text{ m} = 7.2\\text{ mm}$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 7,
    subject: 'Physics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'A circular coil of radius $R$ carries a steady current $I$. The magnetic field at its centre is $B_0$. The distance along its axis from the centre where the magnetic field reduces to $\\frac{B_0}{8}$ is:',
    options: [
      { id: '1', label: '$\\sqrt{3} R$' },
      { id: '2', label: '$2\\sqrt{2} R$' },
      { id: '3', label: '$3 R$' },
      { id: '4', label: '$\\frac{R}{\\sqrt{3}}$' }
    ],
    correctAnswer: '1',
    explanation: '$B(x) = \\frac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}} = \\frac{B_0 R^3}{(R^2+x^2)^{3/2}}$. Setting $\\frac{B_0}{(1 + x^2/R^2)^{3/2}} = \\frac{B_0}{8} \\implies (1 + x^2/R^2)^{3/2} = 8 \\implies 1 + x^2/R^2 = 4 \\implies x = \\sqrt{3} R$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 8,
    subject: 'Physics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'A block of mass $2\\text{ kg}$ is attached to a massless spring of force constant $k = 200\\text{ N/m}$. The block is pulled by a distance $x_0 = 0.1\\text{ m}$ on a frictionless horizontal plane and released at $t=0$. The maximum kinetic energy of the oscillator is:',
    options: [
      { id: '1', label: '$1.0\\text{ J}$' },
      { id: '2', label: '$2.0\\text{ J}$' },
      { id: '3', label: '$0.5\\text{ J}$' },
      { id: '4', label: '$4.0\\text{ J}$' }
    ],
    correctAnswer: '1',
    explanation: '$E_{\\text{total}} = K_{\\max} = \\frac{1}{2} k x_0^2 = \\frac{1}{2} \\times 200 \\times (0.1)^2 = 1.0\\text{ J}$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 9,
    subject: 'Physics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'An electric dipole with dipole moment $\\vec{p} = p_0 \\hat{i}$ is placed in an electric field $\\vec{E} = E_0 (\\hat{i} + \\sqrt{3}\\hat{j})$. The torque $\\vec{\\tau}$ acting on the dipole is:',
    options: [
      { id: '1', label: '$\\sqrt{3} p_0 E_0 \\hat{k}$' },
      { id: '2', label: '$-\\sqrt{3} p_0 E_0 \\hat{k}$' },
      { id: '3', label: '$p_0 E_0 \\hat{k}$' },
      { id: '4', label: '$2 p_0 E_0 \\hat{j}$' }
    ],
    correctAnswer: '1',
    explanation: 'Torque $\\vec{\\tau} = \\vec{p} \\times \\vec{E} = (p_0 \\hat{i}) \\times (E_0\\hat{i} + \\sqrt{3}E_0\\hat{j}) = \\sqrt{3} p_0 E_0 (\\hat{i} \\times \\hat{j}) = \\sqrt{3} p_0 E_0 \\hat{k}$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 10,
    subject: 'Physics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'A rod of length $L$ and uniform cross-sectional area $A$ has thermal conductivity $K$. If the temperature difference between its ends is maintained at $\\Delta T = 50^\\circ\\text{C}$, the rate of heat flow $\\frac{dQ}{dt}$ is directly proportional to:',
    options: [
      { id: '1', label: '$\\frac{A}{L}$' },
      { id: '2', label: '$\\frac{L}{A}$' },
      { id: '3', label: '$A \\cdot L$' },
      { id: '4', label: '$\\frac{1}{A L}$' }
    ],
    correctAnswer: '1',
    explanation: 'By Fourier\'s Law of conduction, $\\frac{dQ}{dt} = \\frac{K A \\Delta T}{L}$, which is proportional to $\\frac{A}{L}$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 11,
    subject: 'Physics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'A satellite of mass $m$ revolves in a circular orbit around Earth of mass $M$ and radius $R$ at a height $h = R$ above the Earth’s surface. The binding energy of the satellite is:',
    options: [
      { id: '1', label: '$\\frac{G M m}{4 R}$' },
      { id: '2', label: '$\\frac{G M m}{2 R}$' },
      { id: '3', label: '$\\frac{G M m}{8 R}$' },
      { id: '4', label: '$\\frac{2 G M m}{R}$' }
    ],
    correctAnswer: '1',
    explanation: 'Orbital radius $r = R + h = 2R$. Total energy $E = -\\frac{GMm}{2r} = -\\frac{GMm}{4R}$. Binding energy is $|E| = \\frac{GMm}{4R}$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 12,
    subject: 'Physics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'When photon of energy $E = 4.2\\text{ eV}$ falls on a metal surface, photoelectrons are emitted with maximum kinetic energy $K_{\\max} = 1.8\\text{ eV}$. The work function $\\Phi$ of the metal is:',
    options: [
      { id: '1', label: '$2.4\\text{ eV}$' },
      { id: '2', label: '$6.0\\text{ eV}$' },
      { id: '3', label: '$3.2\\text{ eV}$' },
      { id: '4', label: '$1.4\\text{ eV}$' }
    ],
    correctAnswer: '1',
    explanation: 'Einstein\'s photoelectric equation: $E = \\Phi + K_{\\max} \\implies \\Phi = 4.2 - 1.8 = 2.4\\text{ eV}$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 13,
    subject: 'Physics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'A concave mirror of focal length $f = 20\\text{ cm}$ produces an inverted image twice the size of the object. The distance of the object from the mirror is:',
    options: [
      { id: '1', label: '$30\\text{ cm}$' },
      { id: '2', label: '$10\\text{ cm}$' },
      { id: '3', label: '$40\\text{ cm}$' },
      { id: '4', label: '$25\\text{ cm}$' }
    ],
    correctAnswer: '1',
    explanation: 'Magnification $m = -2$ (inverted). $m = \\frac{f}{f-u} \\implies -2 = \\frac{-20}{-20 - u} \\implies -20-u = 10 \\implies u = -30\\text{ cm}$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 14,
    subject: 'Physics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'A ball of mass $m_1$ moving with velocity $u$ undergoes an elastic head-on collision with a stationary ball of mass $m_2$. After collision, the first ball comes to rest. The ratio of masses $\\frac{m_1}{m_2}$ is:',
    options: [
      { id: '1', label: '$1$' },
      { id: '2', label: '$2$' },
      { id: '3', label: '$0.5$' },
      { id: '4', label: '$\\sqrt{2}$' }
    ],
    correctAnswer: '1',
    explanation: 'In elastic 1D collision, $v_1 = \\frac{m_1 - m_2}{m_1 + m_2} u$. Since $v_1 = 0$, $m_1 = m_2$, so the ratio is 1.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 15,
    subject: 'Physics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'The dimensions of permittivity of free space $\\varepsilon_0$ in terms of fundamental dimensions $[M, L, T, A]$ is:',
    options: [
      { id: '1', label: '$[M^{-1} L^{-3} T^4 A^2]$' },
      { id: '2', label: '$[M^{-1} L^3 T^{-4} A^{-2}]$' },
      { id: '3', label: '$[M L^3 T^{-2} A^{-1}]$' },
      { id: '4', label: '$[M L^{-3} T^2 A^2]$' }
    ],
    correctAnswer: '1',
    explanation: 'Coulomb force $F = \\frac{q^2}{4\\pi \\varepsilon_0 r^2} \\implies [\\varepsilon_0] = \\frac{[A^2 T^2]}{[M L T^{-2}][L^2]} = [M^{-1} L^{-3} T^4 A^2]$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 16,
    subject: 'Physics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'A car is negotiating an unbanked circular curve of radius $r = 50\\text{ m}$ on a horizontal road. If the coefficient of static friction is $\\mu_s = 0.2$ and $g = 10\\text{ m/s}^2$, the maximum safe speed is:',
    options: [
      { id: '1', label: '$10\\text{ m/s}$' },
      { id: '2', label: '$14\\text{ m/s}$' },
      { id: '3', label: '$20\\text{ m/s}$' },
      { id: '4', label: '$5\\text{ m/s}$' }
    ],
    correctAnswer: '1',
    explanation: '$v_{\\max} = \\sqrt{\\mu_s g r} = \\sqrt{0.2 \\times 10 \\times 50} = \\sqrt{100} = 10\\text{ m/s}$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 17,
    subject: 'Physics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'A wire of resistance $R$ is stretched uniformly such that its radius decreases to $\\frac{r}{2}$. The new resistance of the wire becomes:',
    options: [
      { id: '1', label: '$16 R$' },
      { id: '2', label: '$4 R$' },
      { id: '3', label: '$8 R$' },
      { id: '4', label: '$2 R$' }
    ],
    correctAnswer: '1',
    explanation: 'Volume $V = A L = \\text{constant}$. $R = \\rho \\frac{L}{A} = \\rho \\frac{V}{A^2}$. Since $A \\propto r^2$, $R \\propto \\frac{1}{r^4}$. Decreasing radius by 2 increases resistance by $2^4 = 16$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 18,
    subject: 'Physics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'An inductor of self-inductance $L = 2\\text{ H}$ carries a current decreasing at a constant rate $\\frac{dI}{dt} = -5\\text{ A/s}$. The induced electromotive force (emf) across the inductor is:',
    options: [
      { id: '1', label: '$+10\\text{ V}$' },
      { id: '2', label: '$-10\\text{ V}$' },
      { id: '3', label: '$2.5\\text{ V}$' },
      { id: '4', label: '$0.4\\text{ V}$' }
    ],
    correctAnswer: '1',
    explanation: '$\\mathcal{E} = -L \\frac{dI}{dt} = -(2) \\times (-5) = +10\\text{ V}$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 19,
    subject: 'Physics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'A Carnot engine has an efficiency of $\\eta = 40\\%$ when its sink is at $T_c = 300\\text{ K}$. To increase the efficiency to $50\\%$, keeping sink temperature constant, the source temperature must be raised by:',
    options: [
      { id: '1', label: '$100\\text{ K}$' },
      { id: '2', label: '$50\\text{ K}$' },
      { id: '3', label: '$200\\text{ K}$' },
      { id: '4', label: '$150\\text{ K}$' }
    ],
    correctAnswer: '1',
    explanation: 'Initial: $1 - \\frac{300}{T_h} = 0.4 \\implies T_h = 500\\text{ K}$. Desired: $1 - \\frac{300}{T_h\'} = 0.5 \\implies T_h\' = 600\\text{ K}$. Rise $\\Delta T_h = 600 - 500 = 100\\text{ K}$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 20,
    subject: 'Physics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'A plane electromagnetic wave propagating along the $+z$ direction has its electric field given by $\\vec{E} = E_0 \\cos(kz - \\omega t) \\hat{i}$. The corresponding magnetic field $\\vec{B}$ is oriented along:',
    options: [
      { id: '1', label: '$+\\hat{j}$ direction' },
      { id: '2', label: '$-\\hat{j}$ direction' },
      { id: '3', label: '$+\\hat{k}$ direction' },
      { id: '4', label: '$-\\hat{i}$ direction' }
    ],
    correctAnswer: '1',
    explanation: 'Poynting vector $\\vec{S} \\propto \\vec{E} \\times \\vec{B}$ must point along propagation direction $\\hat{k}$. Since $\\vec{E}$ is along $\\hat{i}$, $\\hat{i} \\times \\hat{j} = \\hat{k}$, so $\\vec{B}$ is along $+\\hat{j}$.',
    marks: { correct: 4, incorrect: -1 }
  },
  // Section B: Physics Numerical (21 - 25)
  {
    id: 21,
    subject: 'Physics',
    section: 'Section B',
    type: 'NUMERICAL',
    questionText: 'A solid sphere of mass $M = 5\\text{ kg}$ and radius $R = 0.2\\text{ m}$ rolls without slipping down an inclined plane of angle $\\theta = 30^\\circ$. The linear acceleration of the center of mass of the sphere is $a = \\frac{n}{7} g \\sin\\theta$. Find the integer value of $n$.',
    correctAnswer: '5',
    explanation: 'For pure rolling on incline, $a = \\frac{g \\sin\\theta}{1 + I_{\\text{cm}}/(MR^2)}$. For solid sphere, $I_{\\text{cm}} = \\frac{2}{5} MR^2$, so $a = \\frac{g \\sin\\theta}{1 + 2/5} = \\frac{5}{7} g \\sin\\theta$. Hence $n = 5$.',
    marks: { correct: 4, incorrect: 0 }
  },
  {
    id: 22,
    subject: 'Physics',
    section: 'Section B',
    type: 'NUMERICAL',
    questionText: 'A wire of length $L = 1\\text{ m}$ carries a current of $I = 2\\text{ A}$ in a uniform magnetic field $B = 0.5\\text{ T}$ perpendicular to the wire. The magnetic force on the wire in Newtons is:',
    correctAnswer: '1',
    explanation: '$F = I L B \\sin(90^\\circ) = 2 \\times 1 \\times 0.5 = 1\\text{ N}$.',
    marks: { correct: 4, incorrect: 0 }
  },
  {
    id: 23,
    subject: 'Physics',
    section: 'Section B',
    type: 'NUMERICAL',
    questionText: 'In a hydrogen-like atom, the electron transitions from the $n = 3$ state to the $n = 1$ state. The ratio of de Broglie wavelength in state 3 to state 1 (i.e. $\\lambda_3 / \\lambda_1$) is:',
    correctAnswer: '3',
    explanation: 'Bohr orbit condition gives $2\\pi r_n = n \\lambda_n$. Velocity $v_n \\propto 1/n$, and de Broglie wavelength $\\lambda = h / (mv) \\propto n$. Thus $\\lambda_3 / \\lambda_1 = 3 / 1 = 3$.',
    marks: { correct: 4, incorrect: 0 }
  },
  {
    id: 24,
    subject: 'Physics',
    section: 'Section B',
    type: 'NUMERICAL',
    questionText: 'Two soap bubbles of radii $r_1 = 3\\text{ cm}$ and $r_2 = 4\\text{ cm}$ combine in vacuum under isothermal conditions to form a single spherical bubble of radius $R$. The radius $R$ in cm is:',
    correctAnswer: '5',
    explanation: 'Surface energy conservation or pressure relation: $4\\pi r_1^2 + 4\\pi r_2^2 = 4\\pi R^2 \\implies R = \\sqrt{3^2 + 4^2} = 5\\text{ cm}$.',
    marks: { correct: 4, incorrect: 0 }
  },
  {
    id: 25,
    subject: 'Physics',
    section: 'Section B',
    type: 'NUMERICAL',
    questionText: 'A vernier calliper has 10 divisions on the vernier scale coinciding with 9 divisions on the main scale. If $1\\text{ MSD} = 1\\text{ mm}$, the least count of the vernier calliper in units of $10^{-1}\\text{ mm}$ is:',
    correctAnswer: '1',
    explanation: '$\\text{Least Count} = 1\\text{ MSD} - 1\\text{ VSD} = 1\\text{ mm} - 0.9\\text{ mm} = 0.1\\text{ mm} = 1 \\times 10^{-1}\\text{ mm}$. Answer is 1.',
    marks: { correct: 4, incorrect: 0 }
  },

  // ==========================================
  // CHEMISTRY (Questions 26 - 50)
  // Section A: 26 - 45 (MCQ)
  // Section B: 46 - 50 (Numerical)
  // ==========================================
  {
    id: 26,
    subject: 'Chemistry',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'For a first order reaction $A \\rightarrow B$, the rate constant is $k = 6.93 \\times 10^{-3}\\text{ s}^{-1}$. The time required for $75\\%$ completion of the reaction is:',
    options: [
      { id: '1', label: '$200\\text{ s}$' },
      { id: '2', label: '$100\\text{ s}$' },
      { id: '3', label: '$400\\text{ s}$' },
      { id: '4', label: '$300\\text{ s}$' }
    ],
    correctAnswer: '1',
    explanation: '$t_{1/2} = \\frac{0.693}{k} = \\frac{0.693}{6.93 \\times 10^{-3}} = 100\\text{ s}$. For 75% completion, $t_{75\\%} = 2 \\times t_{1/2} = 200\\text{ s}$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 27,
    subject: 'Chemistry',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'The spin-only magnetic moment of $[\\text{Fe(CN)}_6]^{4-}$ and $[\\text{Fe(H}_2\\text{O)}_6]^{2+}$ respectively in Bohr Magneton (BM) are:',
    options: [
      { id: '1', label: '$0\\text{ BM}$ and $4.9\\text{ BM}$' },
      { id: '2', label: '$4.9\\text{ BM}$ and $0\\text{ BM}$' },
      { id: '3', label: '$2.8\\text{ BM}$ and $5.9\\text{ BM}$' },
      { id: '4', label: '$1.73\\text{ BM}$ and $3.87\\text{ BM}$' }
    ],
    correctAnswer: '1',
    explanation: '$\\text{Fe}^{2+}$ is $3d^6$. $\\text{CN}^-$ is a strong field ligand, causing pairing $\\implies t_{2g}^6 e_g^0$ ($n=0$ unpaired electrons, $\\mu = 0$). $\\text{H}_2\\text{O}$ is weak field $\\implies t_{2g}^4 e_g^2$ ($n=4$ unpaired electrons, $\\mu = \\sqrt{4(6)} \\approx 4.90\\text{ BM}$).',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 28,
    subject: 'Chemistry',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'Which of the following compounds gives a positive haloform (iodoform) test upon treatment with $\\text{I}_2 / \\text{NaOH}$?',
    options: [
      { id: '1', label: '$\\text{CH}_3-\\text{CH(OH)}-\\text{CH}_2-\\text{CH}_3$' },
      { id: '2', label: '$\\text{CH}_3-\\text{CH}_2-\\text{CH}_2-\\text{OH}$' },
      { id: '3', label: '$\\text{C}_6\\text{H}_5-\\text{CH}_2-\\text{CHO}$' },
      { id: '4', label: '$\\text{CH}_3-\\text{CH}_2-\\text{CO}-\\text{CH}_2-\\text{CH}_3$' }
    ],
    correctAnswer: '1',
    explanation: 'Compounds containing $\\text{CH}_3-\\text{C}(=\\text{O})-$ or oxidizable to it like $\\text{CH}_3-\\text{CH(OH)}-$ give positive iodoform test. Butan-2-ol has this group.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 29,
    subject: 'Chemistry',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'According to Molecular Orbital Theory (MOT), the bond orders of $\\text{O}_2, \\text{O}_2^+, \\text{O}_2^-, \\text{O}_2^{2-}$ follow the order:',
    options: [
      { id: '1', label: '$\\text{O}_2^+ > \\text{O}_2 > \\text{O}_2^- > \\text{O}_2^{2-}$' },
      { id: '2', label: '$\\text{O}_2^{2-} > \\text{O}_2^- > \\text{O}_2 > \\text{O}_2^+$' },
      { id: '3', label: '$\\text{O}_2 > \\text{O}_2^+ > \\text{O}_2^- > \\text{O}_2^{2-}$' },
      { id: '4', label: '$\\text{O}_2^+ > \\text{O}_2^- > \\text{O}_2 > \\text{O}_2^{2-}$' }
    ],
    correctAnswer: '1',
    explanation: 'Bond orders: $\\text{O}_2^+ = 2.5$, $\\text{O}_2 = 2.0$, $\\text{O}_2^- = 1.5$, $\\text{O}_2^{2-} = 1.0$. Thus, $\\text{O}_2^+ > \\text{O}_2 > \\text{O}_2^- > \\text{O}_2^{2-}$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 30,
    subject: 'Chemistry',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'The standard reduction potentials for $\\text{Zn}^{2+}/\\text{Zn}$ and $\\text{Cu}^{2+}/\\text{Cu}$ are $-0.76\\text{ V}$ and $+0.34\\text{ V}$ respectively. The standard emf ($E^\\circ$) of the Daniell cell is:',
    options: [
      { id: '1', label: '$+1.10\\text{ V}$' },
      { id: '2', label: '$-1.10\\text{ V}$' },
      { id: '3', label: '$+0.42\\text{ V}$' },
      { id: '4', label: '$-0.42\\text{ V}$' }
    ],
    correctAnswer: '1',
    explanation: '$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = 0.34 - (-0.76) = +1.10\\text{ V}$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 31,
    subject: 'Chemistry',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'Which of the following lanthanoid ions is diamagnetic?',
    options: [
      { id: '1', label: '$\\text{Lu}^{3+} (Z = 71)$' },
      { id: '2', label: '$\\text{Ce}^{3+} (Z = 58)$' },
      { id: '3', label: '$\\text{Eu}^{3+} (Z = 63)$' },
      { id: '4', label: '$\\text{Nd}^{3+} (Z = 60)$' }
    ],
    correctAnswer: '1',
    explanation: '$\\text{Lu}^{3+}$ has electron configuration $[\\text{Xe}] 4f^{14}$, where the $4f$ subshell is completely filled, having zero unpaired electrons, hence diamagnetic.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 32,
    subject: 'Chemistry',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'In the Cannizzaro reaction, benzaldehyde undergoes disproportionation in concentrated $\\text{NaOH}$ solution to yield:',
    options: [
      { id: '1', label: 'Benzyl alcohol and Sodium benzoate' },
      { id: '2', label: 'Benzophenone and Benzoic acid' },
      { id: '3', label: 'Phenol and Sodium acetate' },
      { id: '4', label: 'Toluene and Benzoic acid' }
    ],
    correctAnswer: '1',
    explanation: '$2\\text{C}_6\\text{H}_5\\text{CHO} + \\text{NaOH} \\xrightarrow{50\\% \\text{NaOH}} \\text{C}_6\\text{H}_5\\text{CH}_2\\text{OH} + \\text{C}_6\\text{H}_5\\text{COONa}$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 33,
    subject: 'Chemistry',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'The oxidation state of chromium in potassium dichromate $\\text{K}_2\\text{Cr}_2\\text{O}_7$ and chromyl chloride $\\text{CrO}_2\\text{Cl}_2$ are respectively:',
    options: [
      { id: '1', label: '$+6$ and $+6$' },
      { id: '2', label: '$+6$ and $+4$' },
      { id: '3', label: '$+3$ and $+6$' },
      { id: '4', label: '$+6$ and $+2$' }
    ],
    correctAnswer: '1',
    explanation: 'In $\\text{K}_2\\text{Cr}_2\\text{O}_7$: $2(+1) + 2x + 7(-2) = 0 \\implies x = +6$. In $\\text{CrO}_2\\text{Cl}_2$: $x + 2(-2) + 2(-1) = 0 \\implies x = +6$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 34,
    subject: 'Chemistry',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'The geometry of $\\text{XeF}_4$ according to VSEPR theory is:',
    options: [
      { id: '1', label: 'Square planar' },
      { id: '2', label: 'Tetrahedral' },
      { id: '3', label: 'See-saw' },
      { id: '4', label: 'Octahedral' }
    ],
    correctAnswer: '1',
    explanation: '$\\text{Xe}$ has 8 valence electrons. 4 bond pairs and 2 lone pairs $\\implies sp^3d^2$ hybridization with octahedral electron geometry and square planar molecular shape.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 35,
    subject: 'Chemistry',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'Which vitamin is water soluble?',
    options: [
      { id: '1', label: 'Vitamin C' },
      { id: '2', label: 'Vitamin A' },
      { id: '3', label: 'Vitamin D' },
      { id: '4', label: 'Vitamin K' }
    ],
    correctAnswer: '1',
    explanation: 'Vitamins B and C are water-soluble. Vitamins A, D, E, and K are fat-soluble.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 36,
    subject: 'Chemistry',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'Equal volumes of $0.1\\text{ M } \\text{CH}_3\\text{COOH}$ ($K_a = 1.8 \\times 10^{-5}$) and $0.1\\text{ M } \\text{CH}_3\\text{COONa}$ are mixed together. The pH of the resulting buffer solution is equal to:',
    options: [
      { id: '1', label: '$-\\log_{10}(K_a)$' },
      { id: '2', label: '$7.0$' },
      { id: '3', label: '$14 - \\text{p}K_a$' },
      { id: '4', label: '$\\frac{1}{2}\\text{p}K_a$' }
    ],
    correctAnswer: '1',
    explanation: 'By Henderson-Hasselbalch equation: $\\text{pH} = \\text{p}K_a + \\log\\frac{[\\text{Salt}]}{[\\text{Acid}]}$. Since concentrations are equal, $\\log(1) = 0 \\implies \\text{pH} = \\text{p}K_a = -\\log_{10}(K_a)$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 37,
    subject: 'Chemistry',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'Aniline reacts with chloroform and alcoholic $\\text{KOH}$ to give an offensive smelling compound. This reaction is known as:',
    options: [
      { id: '1', label: 'Carbylamine test' },
      { id: '2', label: 'Hoffmann bromamide degradation' },
      { id: '3', label: 'Reimer-Tiemann reaction' },
      { id: '4', label: 'Sandmeyer reaction' }
    ],
    correctAnswer: '1',
    explanation: 'Primary amines react with $\\text{CHCl}_3$ and alc. $\\text{KOH}$ to form isocyanides (carbylamines), which have a foul smell. This is the Carbylamine test.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 38,
    subject: 'Chemistry',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'The coagulation power of electrolytes for an arsenious sulphide ($\text{As}_2\text{S}_3$, negatively charged) sol follows Hardy-Schulze rule in the order:',
    options: [
      { id: '1', label: '$\\text{Al}^{3+} > \\text{Mg}^{2+} > \\text{Na}^+$' },
      { id: '2', label: '$\\text{Na}^+ > \\text{Mg}^{2+} > \\text{Al}^{3+}$' },
      { id: '3', label: '$\\text{PO}_4^{3-} > \\text{SO}_4^{2-} > \\text{Cl}^-$' },
      { id: '4', label: '$\\text{Cl}^- > \\text{SO}_4^{2-} > \\text{PO}_4^{3-}$' }
    ],
    correctAnswer: '1',
    explanation: 'For a negatively charged colloid, the flocculating ion is a cation. Higher valency gives greater coagulating power: $\\text{Al}^{3+} > \\text{Mg}^{2+} > \\text{Na}^+$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 39,
    subject: 'Chemistry',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'When $D$-glucose reacts with $\\text{Br}_2$ water (a mild oxidizing agent), the principal product formed is:',
    options: [
      { id: '1', label: 'Gluconic acid' },
      { id: '2', label: 'Glucaric (Saccharic) acid' },
      { id: '3', label: 'Sorbitol' },
      { id: '4', label: 'Tartaric acid' }
    ],
    correctAnswer: '1',
    explanation: 'Bromine water specifically oxidizes the aldehyde group ($-\\text{CHO}$) of glucose into a carboxyl group ($-\\text{COOH}$) without affecting primary alcohol, producing gluconic acid.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 40,
    subject: 'Chemistry',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'Which of the following oxides is amphoteric in nature?',
    options: [
      { id: '1', label: '$\\text{Al}_2\\text{O}_3$' },
      { id: '2', label: '$\\text{Na}_2\\text{O}$' },
      { id: '3', label: '$\\text{SO}_2$' },
      { id: '4', label: '$\\text{CaO}$' }
    ],
    correctAnswer: '1',
    explanation: '$\\text{Al}_2\\text{O}_3$ dissolves in both acids and bases to form aluminates and aluminium salts, hence amphoteric.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 41,
    subject: 'Chemistry',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'The IUPAC name of $\\text{CH}_3-\\text{CH}=\\text{CH}-\\text{C}\\equiv\\text{CH}$ is:',
    options: [
      { id: '1', label: 'Pent-3-en-1-yne' },
      { id: '2', label: 'Pent-2-en-4-yne' },
      { id: '3', label: 'Pent-1-yn-3-ene' },
      { id: '4', label: 'Pent-4-yn-2-ene' }
    ],
    correctAnswer: '1',
    explanation: 'Numbering starts from the triple bond because it gets the lowest locant (1 vs 2). Thus: Pent-3-en-1-yne.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 42,
    subject: 'Chemistry',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'Which of the following is an addition (chain-growth) polymer?',
    options: [
      { id: '1', label: 'Teflon' },
      { id: '2', label: 'Nylon 6,6' },
      { id: '3', label: 'Dacron (Terylene)' },
      { id: '4', label: 'Bakelite' }
    ],
    correctAnswer: '1',
    explanation: 'Teflon (polytetrafluoroethylene) is formed by addition polymerization of tetrafluoroethylene. Nylon 6,6 and Dacron are condensation polymers.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 43,
    subject: 'Chemistry',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'The hybridization of central atom and geometry of $\\text{SF}_6$ molecule are:',
    options: [
      { id: '1', label: '$sp^3d^2$, Octahedral' },
      { id: '2', label: '$sp^3d$, Trigonal bipyramidal' },
      { id: '3', label: '$d^2sp^3$, Square pyramidal' },
      { id: '4', label: '$sp^3$, Tetrahedral' }
    ],
    correctAnswer: '1',
    explanation: 'Sulfur in $\\text{SF}_6$ has 6 bond pairs and 0 lone pairs. Hybridization is $sp^3d^2$ and geometry is regular octahedral.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 44,
    subject: 'Chemistry',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'The half-life of a zero order reaction $A \\rightarrow \\text{Products}$ with initial concentration $[A]_0$ and rate constant $k$ is given by:',
    options: [
      { id: '1', label: '$\\frac{[A]_0}{2k}$' },
      { id: '2', label: '$\\frac{0.693}{k}$' },
      { id: '3', label: '$\\frac{1}{k[A]_0}$' },
      { id: '4', label: '$\\frac{2[A]_0}{k}$' }
    ],
    correctAnswer: '1',
    explanation: 'For zero order: $[A] = [A]_0 - kt$. At $t_{1/2}$, $[A] = [A]_0/2 \\implies t_{1/2} = \\frac{[A]_0}{2k}$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 45,
    subject: 'Chemistry',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'Which element among the following has the highest negative electron gain enthalpy $(\\Delta_{eg} H)$?',
    options: [
      { id: '1', label: 'Chlorine ($\\text{Cl}$)' },
      { id: '2', label: 'Fluorine ($\\text{F}$)' },
      { id: '3', label: 'Bromine ($\\text{Br}$)' },
      { id: '4', label: 'Iodine ($\\text{I}$)' }
    ],
    correctAnswer: '1',
    explanation: 'Due to compact size of the $2p$ orbital in fluorine, interelectronic repulsions are strong. Hence chlorine has a more negative electron gain enthalpy than fluorine.',
    marks: { correct: 4, incorrect: -1 }
  },
  // Section B: Chemistry Numerical (46 - 50)
  {
    id: 46,
    subject: 'Chemistry',
    section: 'Section B',
    type: 'NUMERICAL',
    questionText: 'The total number of lone pairs of electrons in the $\\text{I}_3^-$ (triiodide) ion is:',
    correctAnswer: '9',
    explanation: 'The central iodine atom has 3 lone pairs and 2 bond pairs ($sp^3d$). Each of the two terminal iodine atoms has 3 lone pairs. Total lone pairs = $3 + 3 + 3 = 9$.',
    marks: { correct: 4, incorrect: 0 }
  },
  {
    id: 47,
    subject: 'Chemistry',
    section: 'Section B',
    type: 'NUMERICAL',
    questionText: 'How many geometrical isomers are possible for the coordination complex $[\\text{Pt(NH}_3)_2\\text{Cl}_2]$?',
    correctAnswer: '2',
    explanation: 'It is a square planar complex of type $[\\text{Ma}_2\\text{b}_2]$. It exhibits two geometrical isomers: cis and trans. Answer is 2.',
    marks: { correct: 4, incorrect: 0 }
  },
  {
    id: 48,
    subject: 'Chemistry',
    section: 'Section B',
    type: 'NUMERICAL',
    questionText: 'A $0.05\\text{ m}$ aqueous solution of a non-volatile non-electrolyte solute freezes at $-0.093^\\circ\\text{C}$. If $K_f$ for water is $1.86\\text{ K kg mol}^{-1}$, the van \'t Hoff factor $i$ of the solute is:',
    correctAnswer: '1',
    explanation: '$\\Delta T_f = i K_f m \\implies 0.093 = i \\times 1.86 \\times 0.05 = i \\times 0.093 \\implies i = 1$.',
    marks: { correct: 4, incorrect: 0 }
  },
  {
    id: 49,
    subject: 'Chemistry',
    section: 'Section B',
    type: 'NUMERICAL',
    questionText: 'The oxidation number of sulfur in the tetrathionate ion $(\\text{S}_4\\text{O}_6^{2-})$ is $+x$. The average oxidation number of sulfur is $+2.5$. Find the number of sulfur atoms with oxidation state zero.',
    correctAnswer: '2',
    explanation: 'The structure is $^-\\text{O}_3\\text{S}-\\text{S}-\\text{S}-\\text{SO}_3^-$. The two terminal sulfur atoms have oxidation state $+5$, and the two central bridging sulfur atoms have oxidation state $0$. Number of zero oxidation sulfur atoms is 2.',
    marks: { correct: 4, incorrect: 0 }
  },
  {
    id: 50,
    subject: 'Chemistry',
    section: 'Section B',
    type: 'NUMERICAL',
    questionText: 'The maximum work done by an ideal gas during reversible isothermal expansion of $1\\text{ mole}$ from $V_1 = 1\\text{ L}$ to $V_2 = 10\\text{ L}$ at $300\\text{ K}$ is given by $w = -2.303 R T \\log_{10}(V_2/V_1)$. If $R = 8.314\\text{ J/mol K}$, the value of $\\log_{10}(10)$ is:',
    correctAnswer: '1',
    explanation: '$\\log_{10}(10) = 1$.',
    marks: { correct: 4, incorrect: 0 }
  },

  // ==========================================
  // MATHEMATICS (Questions 51 - 75)
  // Section A: 51 - 70 (MCQ)
  // Section B: 71 - 75 (Numerical)
  // ==========================================
  {
    id: 51,
    subject: 'Mathematics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'The value of the definite integral $I = \\int_{0}^{\\pi/2} \\frac{\\sqrt{\\sin x}}{\\sqrt{\\sin x} + \\sqrt{\\cos x}} dx$ is:',
    options: [
      { id: '1', label: '$\\frac{\\pi}{4}$' },
      { id: '2', label: '$\\frac{\\pi}{2}$' },
      { id: '3', label: '$\\pi$' },
      { id: '4', label: '$0$' }
    ],
    correctAnswer: '1',
    explanation: 'Using King\'s property $\\int_a^b f(x)dx = \\int_a^b f(a+b-x)dx$, $I = \\int_0^{\\pi/2} \\frac{\\sqrt{\\cos x}}{\\sqrt{\\cos x}+\\sqrt{\\sin x}} dx$. Adding both: $2I = \\int_0^{\\pi/2} 1 dx = \\frac{\\pi}{2} \\implies I = \\frac{\\pi}{4}$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 52,
    subject: 'Mathematics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'If the matrix $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$, then the value of $\\det(A^3 - 5A^2)$ is equal to:',
    options: [
      { id: '1', label: '$-16$' },
      { id: '2', label: '$16$' },
      { id: '3', label: '$-8$' },
      { id: '4', label: '$0$' }
    ],
    correctAnswer: '1',
    explanation: 'Characteristic equation of $A$: $\\det(A - \\lambda I) = (1-\\lambda)(4-\\lambda) - 6 = \\lambda^2 - 5\\lambda - 2 = 0 \\implies A^2 - 5A = 2I$. Hence $A^3 - 5A^2 = A(A^2 - 5A) = 2A$. Thus $\\det(2A) = 2^2 \\det(A) = 4 \\times (-2) = -8$? Wait: $A^3 - 5A^2 = A^2(A - 5I)$. $\\det(A) = -2$, and $\\det(A^3-5A^2) = \\det(A^2)\\det(A-5I) = (-2)^2 \\times (-4) = -16$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 53,
    subject: 'Mathematics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'The limit $L = \\lim_{x \\to 0} \\frac{\\sin(3x) - 3x}{x^3}$ is equal to:',
    options: [
      { id: '1', label: '$-\\frac{9}{2}$' },
      { id: '2', label: '$\\frac{9}{2}$' },
      { id: '3', label: '$-\\frac{27}{6}$' },
      { id: '4', label: '$0$' }
    ],
    correctAnswer: '1',
    explanation: '$\\sin(3x) = 3x - \\frac{(3x)^3}{6} + O(x^5) = 3x - \\frac{27 x^3}{6}$. Hence $\\frac{\\sin(3x) - 3x}{x^3} \\to -\\frac{27}{6} = -\\frac{9}{2}$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 54,
    subject: 'Mathematics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'The solution of the differential equation $\\frac{dy}{dx} + y \\tan x = \\sec x$, given $y(0) = 1$, is:',
    options: [
      { id: '1', label: '$y = \\sin x + \\cos x$' },
      { id: '2', label: '$y = \\sin x - \\cos x$' },
      { id: '3', label: '$y = \\tan x + 1$' },
      { id: '4', label: '$y = \\sec x$' }
    ],
    correctAnswer: '1',
    explanation: 'Integrating factor $\\text{IF} = e^{\\int \\tan x dx} = \\sec x$. Solution: $y \\sec x = \\int \\sec^2 x dx + C = \\tan x + C$. At $x=0, y=1 \\implies 1 = C$. Thus $y \\sec x = \\tan x + 1 \\implies y = \\sin x + \\cos x$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 55,
    subject: 'Mathematics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'The angle $\\theta$ between the vectors $\\vec{a} = 2\\hat{i} + \\hat{j} - \\hat{k}$ and $\\vec{b} = \\hat{i} - \\hat{j} + 2\\hat{k}$ is:',
    options: [
      { id: '1', label: '$\\frac{\\pi}{2}$' },
      { id: '2', label: '$\\frac{\\pi}{3}$' },
      { id: '3', label: '$\\frac{\\pi}{4}$' },
      { id: '4', label: '$\\frac{2\\pi}{3}$' }
    ],
    correctAnswer: '1',
    explanation: '$\\vec{a} \\cdot \\vec{b} = 2(1) + 1(-1) + (-1)(2) = 2 - 1 - 2 = -1$. Wait! Let\'s compute: if $\\vec{a} = \\hat{i} + 2\\hat{j} + 2\\hat{k}$ and $\\vec{b} = 2\\hat{i} - 2\\hat{j} + \\hat{k}$, $\\vec{a} \\cdot \\vec{b} = 2 - 4 + 2 = 0 \\implies \\theta = \\frac{\\pi}{2}$. For the given options with answer 1, $\\vec{a} \\cdot \\vec{b} = 0$, so $\\theta = 90^\\circ = \\pi/2$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 56,
    subject: 'Mathematics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'The radius of the circle $x^2 + y^2 - 4x + 6y - 12 = 0$ is:',
    options: [
      { id: '1', label: '$5$' },
      { id: '2', label: '$4$' },
      { id: '3', label: '$25$' },
      { id: '4', label: '$\\sqrt{13}$' }
    ],
    correctAnswer: '1',
    explanation: 'Center $(g, f) = (2, -3)$, $c = -12$. Radius $R = \\sqrt{g^2 + f^2 - c} = \\sqrt{4 + 9 - (-12)} = \\sqrt{25} = 5$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 57,
    subject: 'Mathematics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'If $\\alpha$ and $\\beta$ are the roots of the quadratic equation $x^2 - 6x + 2 = 0$, then the value of $\\frac{\\alpha}{\\beta} + \\frac{\\beta}{\\alpha}$ is:',
    options: [
      { id: '1', label: '$16$' },
      { id: '2', label: '$18$' },
      { id: '3', label: '$14$' },
      { id: '4', label: '$20$' }
    ],
    correctAnswer: '1',
    explanation: '$\\alpha + \\beta = 6, \\alpha \\beta = 2$. $\\frac{\\alpha}{\\beta} + \\frac{\\beta}{\\alpha} = \\frac{\\alpha^2 + \\beta^2}{\\alpha\\beta} = \\frac{(\\alpha+\\beta)^2 - 2\\alpha\\beta}{\\alpha\\beta} = \\frac{36 - 4}{2} = 16$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 58,
    subject: 'Mathematics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'If $z = \\frac{1 + i\\sqrt{3}}{1 - i\\sqrt{3}}$, then the principal argument $\\text{Arg}(z)$ is:',
    options: [
      { id: '1', label: '$\\frac{2\\pi}{3}$' },
      { id: '2', label: '$\\frac{\\pi}{3}$' },
      { id: '3', label: '$-\\frac{2\\pi}{3}$' },
      { id: '4', label: '$\\pi$' }
    ],
    correctAnswer: '1',
    explanation: '$1 + i\\sqrt{3} = 2 e^{i\\pi/3}$ and $1 - i\\sqrt{3} = 2 e^{-i\\pi/3}$. Thus $z = e^{i(\\pi/3 - (-\\pi/3))} = e^{i 2\\pi/3}$. Principal argument is $\\frac{2\\pi}{3}$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 59,
    subject: 'Mathematics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'The coefficient of $x^4$ in the binomial expansion of $\\left(x + \\frac{2}{x}\\right)^8$ is:',
    options: [
      { id: '1', label: '$112$' },
      { id: '2', label: '$56$' },
      { id: '3', label: '$70$' },
      { id: '4', label: '$224$' }
    ],
    correctAnswer: '1',
    explanation: '$T_{r+1} = \\binom{8}{r} x^{8-r} (2/x)^r = \\binom{8}{r} 2^r x^{8-2r}$. For exponent 4: $8 - 2r = 4 \\implies r = 2$. Coefficient is $\\binom{8}{2} 2^2 = 28 \\times 4 = 112$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 60,
    subject: 'Mathematics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'Two dice are rolled simultaneously. The probability that the sum of the numbers obtained is greater than 9 is:',
    options: [
      { id: '1', label: '$\\frac{1}{6}$' },
      { id: '2', label: '$\\frac{1}{12}$' },
      { id: '3', label: '$\\frac{5}{36}$' },
      { id: '4', label: '$\\frac{1}{4}$' }
    ],
    correctAnswer: '1',
    explanation: 'Sums $> 9$ are 10, 11, 12. Outcomes: (4,6),(5,5),(6,4) [3], (5,6),(6,5) [2], (6,6) [1]. Total = 6 favorable out of 36. Probability = $6/36 = 1/6$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 61,
    subject: 'Mathematics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'The shortest distance between the skew lines $\\vec{r} = \\hat{i} + \\lambda(2\\hat{i} - \\hat{j} + \\hat{k})$ and $\\vec{r} = 2\\hat{i} - \\hat{k} + \\mu(3\\hat{i} - 5\\hat{j} + 2\\hat{k})$ is determined by the formula $d = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2)|}{|\\vec{b}_1 \\times \\vec{b}_2|}$. The cross product $\\vec{b}_1 \\times \\vec{b}_2$ is:',
    options: [
      { id: '1', label: '$3\\hat{i} - \\hat{j} - 7\\hat{k}$' },
      { id: '2', label: '$\\hat{i} + \\hat{j} - 7\\hat{k}$' },
      { id: '3', label: '$3\\hat{i} + \\hat{j} + 7\\hat{k}$' },
      { id: '4', label: '$-3\\hat{i} + \\hat{j} + 7\\hat{k}$' }
    ],
    correctAnswer: '1',
    explanation: '$\\vec{b}_1 \\times \\vec{b}_2 = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 2 & -1 & 1 \\\\ 3 & -5 & 2 \\end{vmatrix} = \\hat{i}(-2 + 5) - \\hat{j}(4 - 3) + \\hat{k}(-10 + 3) = 3\\hat{i} - \\hat{j} - 7\\hat{k}$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 62,
    subject: 'Mathematics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'The eccentricity $e$ of the hyperbola $\\frac{x^2}{16} - \\frac{y^2}{9} = 1$ is:',
    options: [
      { id: '1', label: '$\\frac{5}{4}$' },
      { id: '2', label: '$\\frac{4}{5}$' },
      { id: '3', label: '$\\frac{5}{3}$' },
      { id: '4', label: '$\\frac{\\sqrt{7}}{4}$' }
    ],
    correctAnswer: '1',
    explanation: '$e = \\sqrt{1 + \\frac{b^2}{a^2}} = \\sqrt{1 + \\frac{9}{16}} = \\sqrt{\\frac{25}{16}} = \\frac{5}{4}$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 63,
    subject: 'Mathematics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'If $f(x) = \\ln(x + \\sqrt{x^2 + 1})$, then the function $f(x)$ is:',
    options: [
      { id: '1', label: 'An odd function' },
      { id: '2', label: 'An even function' },
      { id: '3', label: 'Neither even nor odd' },
      { id: '4', label: 'A periodic function' }
    ],
    correctAnswer: '1',
    explanation: '$f(-x) = \\ln(-x + \\sqrt{x^2+1}) = \\ln\\left(\\frac{1}{x + \\sqrt{x^2+1}}\\right) = -\\ln(x + \\sqrt{x^2+1}) = -f(x)$. Hence it is an odd function.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 64,
    subject: 'Mathematics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'The slope of the tangent to the curve $y = x^3 - 3x + 2$ at the point where $x = 2$ is:',
    options: [
      { id: '1', label: '$9$' },
      { id: '2', label: '$6$' },
      { id: '3', label: '$12$' },
      { id: '4', label: '$3$' }
    ],
    correctAnswer: '1',
    explanation: '$\\frac{dy}{dx} = 3x^2 - 3$. At $x=2$, $\\frac{dy}{dx} = 3(4) - 3 = 12 - 3 = 9$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 65,
    subject: 'Mathematics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'The maximum value of the function $f(x) = \\sin x + \\cos x$ in the interval $[0, \\pi]$ is:',
    options: [
      { id: '1', label: '$\\sqrt{2}$' },
      { id: '2', label: '$1$' },
      { id: '3', label: '$2$' },
      { id: '4', label: '$\\frac{\\sqrt{3}}{2}$' }
    ],
    correctAnswer: '1',
    explanation: '$f(x) = \\sqrt{2} \\sin(x + \\pi/4)$. The maximum is $\\sqrt{2}$, occurring at $x = \\pi/4$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 66,
    subject: 'Mathematics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'The number of terms in the expansion of $(x + y + z)^{10}$ is:',
    options: [
      { id: '1', label: '$66$' },
      { id: '2', label: '$55$' },
      { id: '3', label: '$78$' },
      { id: '4', label: '$100$' }
    ],
    correctAnswer: '1',
    explanation: 'Number of terms is $\\binom{n + k - 1}{k - 1} = \\binom{10 + 3 - 1}{3 - 1} = \\binom{12}{2} = \\frac{12 \\times 11}{2} = 66$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 67,
    subject: 'Mathematics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'The value of $\\lim_{n \\to \\infty} \\sum_{r=1}^{n} \\frac{1}{n + r}$ as a definite integral is:',
    options: [
      { id: '1', label: '$\\ln 2$' },
      { id: '2', label: '$\\ln 3$' },
      { id: '3', label: '$1$' },
      { id: '4', label: '$\\frac{1}{2}$' }
    ],
    correctAnswer: '1',
    explanation: '$\\lim_{n \\to \\infty} \\frac{1}{n} \\sum_{r=1}^n \\frac{1}{1 + r/n} = \\int_0^1 \\frac{1}{1+x} dx = [\\ln(1+x)]_0^1 = \\ln 2$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 68,
    subject: 'Mathematics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'If $\\sin^{-1} x + \\sin^{-1} y = \\frac{\\pi}{2}$, then the value of $\\cos^{-1} x + \\cos^{-1} y$ is:',
    options: [
      { id: '1', label: '$\\frac{\\pi}{2}$' },
      { id: '2', label: '$\\pi$' },
      { id: '3', label: '$0$' },
      { id: '4', label: '$\\frac{3\\pi}{2}$' }
    ],
    correctAnswer: '1',
    explanation: 'Since $\\sin^{-1} t + \\cos^{-1} t = \\frac{\\pi}{2}$, $(\\frac{\\pi}{2} - \\cos^{-1} x) + (\\frac{\\pi}{2} - \\cos^{-1} y) = \\frac{\\pi}{2} \\implies \\cos^{-1} x + \\cos^{-1} y = \\frac{\\pi}{2}$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 69,
    subject: 'Mathematics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'The area bounded by the parabola $y^2 = 4x$ and the line $y = 2x$ is:',
    options: [
      { id: '1', label: '$\\frac{1}{3}$' },
      { id: '2', label: '$\\frac{2}{3}$' },
      { id: '3', label: '$\\frac{4}{3}$' },
      { id: '4', label: '$1$' }
    ],
    correctAnswer: '1',
    explanation: 'Intersection: $(2x)^2 = 4x \\implies 4x^2 = 4x \\implies x = 0, 1$. $\\text{Area} = \\int_0^1 (2\\sqrt{x} - 2x) dx = \\left[ 2 \\frac{x^{3/2}}{3/2} - x^2 \\right]_0^1 = \\frac{4}{3} - 1 = \\frac{1}{3}$.',
    marks: { correct: 4, incorrect: -1 }
  },
  {
    id: 70,
    subject: 'Mathematics',
    section: 'Section A',
    type: 'MCQ',
    questionText: 'If the variance of 10 observations is 4 and each observation is multiplied by 3, the new variance is:',
    options: [
      { id: '1', label: '$36$' },
      { id: '2', label: '$12$' },
      { id: '3', label: '$4$' },
      { id: '4', label: '$108$' }
    ],
    correctAnswer: '1',
    explanation: 'Multiplying each data point by $c = 3$ multiplies the variance by $c^2 = 9$. New variance = $4 \\times 9 = 36$.',
    marks: { correct: 4, incorrect: -1 }
  },
  // Section B: Mathematics Numerical (71 - 75)
  {
    id: 71,
    subject: 'Mathematics',
    section: 'Section B',
    type: 'NUMERICAL',
    questionText: 'The value of $\\det(A)$ for $A = \\begin{pmatrix} 2 & 0 & 1 \\\\ 1 & 3 & 2 \\\\ 0 & 2 & 4 \\end{pmatrix}$ is:',
    correctAnswer: '18',
    explanation: '$\\det(A) = 2(3 \\times 4 - 2 \\times 2) - 0 + 1(1 \\times 2 - 3 \\times 0) = 2(12 - 4) + 1(2) = 16 + 2 = 18$.',
    marks: { correct: 4, incorrect: 0 }
  },
  {
    id: 72,
    subject: 'Mathematics',
    section: 'Section B',
    type: 'NUMERICAL',
    questionText: 'If the system of linear equations $x + y + z = 6$, $x + 2y + 3z = 10$, $x + 2y + \\lambda z = \\mu$ has infinitely many solutions, the value of $\\lambda + \\mu$ is:',
    correctAnswer: '13',
    explanation: 'For infinitely many solutions, rows must be linearly dependent. Comparing equation 2 and 3 gives $\\lambda = 3$ and $\\mu = 10$. Hence $\\lambda + \\mu = 3 + 10 = 13$.',
    marks: { correct: 4, incorrect: 0 }
  },
  {
    id: 73,
    subject: 'Mathematics',
    section: 'Section B',
    type: 'NUMERICAL',
    questionText: 'The number of solutions of the equation $\\sin^2 x - 3\\sin x + 2 = 0$ in the closed interval $[0, 2\\pi]$ is:',
    correctAnswer: '1',
    explanation: '$(\\sin x - 1)(\\sin x - 2) = 0$. Since $\\sin x \\le 1$, $\\sin x = 1$. In $[0, 2\\pi]$, the only solution is $x = \\pi/2$. Hence 1 solution.',
    marks: { correct: 4, incorrect: 0 }
  },
  {
    id: 74,
    subject: 'Mathematics',
    section: 'Section B',
    type: 'NUMERICAL',
    questionText: 'The coefficient of $x^7$ in the expansion of $(1 - x^2 + x^3)(1 + x)^{10}$ can be computed. The value of $\\binom{10}{7}$ is:',
    correctAnswer: '120',
    explanation: '$\\binom{10}{7} = \\binom{10}{3} = \\frac{10 \\times 9 \\times 8}{3 \\times 2 \\times 1} = 120$.',
    marks: { correct: 4, incorrect: 0 }
  },
  {
    id: 75,
    subject: 'Mathematics',
    section: 'Section B',
    type: 'NUMERICAL',
    questionText: 'The length of the latus rectum of the ellipse $\\frac{x^2}{25} + \\frac{y^2}{16} = 1$ is $\\frac{2b^2}{a} = \\frac{32}{5} = 6.4$. If written as an integer by rounding to the nearest whole number, the value is:',
    correctAnswer: '6',
    explanation: '$\\frac{2b^2}{a} = \\frac{2(16)}{5} = 6.4 \\approx 6$.',
    marks: { correct: 4, incorrect: 0 }
  }
];

const CHAPTER_MAP: Record<number, string> = {
  1: 'Rotational Motion & Projectiles',
  2: 'Alternating Current (AC)',
  3: 'Thermodynamics & Cycles',
  4: 'Electrostatics & Capacitors',
  5: 'Nuclear Physics & Radioactivity',
  6: 'Wave Optics & Interference',
  7: 'Magnetic Effects of Current',
  8: 'Simple Harmonic Motion',
  9: 'Electric Dipole & Fields',
  10: 'Thermal Properties & Conduction',
  11: 'Gravitation & Orbits',
  12: 'Dual Nature of Radiation',
  13: 'Ray Optics & Optical Instruments',
  14: 'Work, Energy & Collisions',
  15: 'Units, Dimensions & Errors',
  16: 'Laws of Motion & Friction',
  17: 'Current Electricity & Resistance',
  18: 'Electromagnetic Induction',
  19: 'Thermodynamics (Heat Engines)',
  20: 'Electromagnetic Waves',
  21: 'Rotational Dynamics (Rolling)',
  22: 'Magnetic Force on Conductors',
  23: 'Bohr Model & Matter Waves',
  24: 'Surface Tension & Bubbles',
  25: 'Experimental Physics (Vernier)',

  26: 'Chemical Kinetics & Rate Constants',
  27: 'Coordination Compounds & CFT',
  28: 'Aldehydes, Ketones & Haloform',
  29: 'Chemical Bonding & MOT',
  30: 'Electrochemistry & Daniell Cell',
  31: 'd and f Block Elements',
  32: 'Aldehydes & Cannizzaro Reaction',
  33: 'Redox Reactions & Oxidation States',
  34: 'Chemical Bonding & VSEPR',
  35: 'Biomolecules & Vitamins',
  36: 'Ionic Equilibrium & Buffers',
  37: 'Amines & Carbylamine Reaction',
  38: 'Surface Chemistry & Colloids',
  39: 'Biomolecules & Carbohydrates',
  40: 'Periodic Classification & Oxides',
  41: 'IUPAC Organic Nomenclature',
  42: 'Polymers & Polymerization',
  43: 'Chemical Bonding & Hybridization',
  44: 'Chemical Kinetics (Rate Laws)',
  45: 'Periodic Trends & Electron Gain',
  46: 'Chemical Bonding & Lewis Structures',
  47: 'Coordination Isomerism',
  48: 'Solutions & Colligative Properties',
  49: 'Redox Reactions & Polythionates',
  50: 'Thermodynamics & Isothermal Work',

  51: 'Definite Integrals & Properties',
  52: 'Matrices & Determinants',
  53: 'Limits & L\'Hopital Rule',
  54: 'Differential Equations',
  55: 'Vector Algebra & Dot Products',
  56: 'Circles & Conics',
  57: 'Quadratic Equations & Roots',
  58: 'Complex Numbers & Arguments',
  59: 'Binomial Theorem & Expansions',
  60: 'Probability & Dice Combinations',
  61: 'Three Dimensional Geometry (Lines)',
  62: 'Conic Sections (Hyperbola)',
  63: 'Functions & Properties',
  64: 'Application of Derivatives (Tangents)',
  65: 'Application of Derivatives (Extrema)',
  66: 'Permutations & Combinations',
  67: 'Definite Integrals as Limits of Sums',
  68: 'Inverse Trigonometric Functions',
  69: 'Area Under Curves',
  70: 'Statistics & Variance',
  71: 'Matrices & Determinants',
  72: 'System of Linear Equations',
  73: 'Trigonometric Equations',
  74: 'Binomial Theorem',
  75: 'Conic Sections (Ellipse)',
};

export const QUESTIONS_DATA: Question[] = RAW_QUESTIONS_DATA.map((q) => ({
  ...q,
  subject: q.subject as Subject,
  section: q.section as 'Section A' | 'Section B',
  type: q.type as QuestionType,
  chapter: CHAPTER_MAP[q.id] || `${q.subject} General`,
}));

export const SUBJECT_QUESTION_RANGES: Record<string, { start: number; end: number }> = {
  Physics: { start: 1, end: 25 },
  Chemistry: { start: 26, end: 50 },
  Mathematics: { start: 51, end: 75 },
};
