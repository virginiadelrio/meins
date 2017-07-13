const React = require('react');

export default {
    play: ({ className, stroke = 'none', fill = '#ffffff' }) => (
        <svg
            className={className}
            viewBox="24 153 26 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M26.5766698,154.3806 C25.1536144,153.521753 24,154.165267 24,155.819528 L24,181.963101 C24,183.616645 25.143848,184.266793 26.5766698,183.402081 L48.0437938,170.446609 C49.4668492,169.587791 49.4766155,168.201243 48.0437938,167.336502 L26.5766698,154.3806 Z"
                stroke={stroke}
                fill={fill}
                fillRule="evenodd"
            />
        </svg>
    ),

    playHarder: ({ className, fill = '#ffffff' }) => (
        <svg
            className={className}
            viewBox="79 566 66 80"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M81.5672167,567.139894 C80.1493821,566.284199 79,566.939233 79,568.591654 L79,643.209154 C79,644.866635 80.1452488,645.519127 81.5672167,644.660965 L143.224863,607.450398 C144.642698,606.59473 144.646831,605.209891 143.224863,604.3517 L81.5672167,567.139894 Z"
                fill={fill}
                fillRule="evenodd"
            />
        </svg>
    ),

    pause: ({ className, fill = '#ffffff' }) => (
        <svg
            className={className}
            viewBox="0 0 58 77"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                fill={fill}
                x="0"
                y="0"
                width="20.6243238"
                height="76.8124466"
                rx="3"
            />
            <rect
                fill={fill}
                x="37.3578337"
                y="0"
                width="20.6243238"
                height="76.8124466"
                rx="3"
            />
        </svg>
    ),
    volume: ({ className, fill = '#ffffff' }) => (
        <svg
            className={className}
            viewBox="0 -1 32 31"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M19.850699,0.0786583567 C19.5962221,-0.048330122 19.2917497,-0.0198327075 19.0647703,0.151651734 L7.82978963,8.62938257 L1.50736324,8.62938257 C0.676438629,8.62938257 0,9.30632116 0,10.1377457 L0,19.2334205 C0,20.0648451 0.676438629,20.7412837 1.50736324,20.7412837 L7.82978963,20.7412837 L19.0647703,29.2185146 C19.1972583,29.3185055 19.3562439,29.3700008 19.5162293,29.3700008 C19.630719,29.3700008 19.7447086,29.3440032 19.850699,29.291508 C20.1051759,29.1645195 20.2661613,28.905043 20.2661613,28.6200689 L20.2661613,0.749597484 C20.2661613,0.465623249 20.1051759,0.205646835 19.850699,0.0786583567 L19.850699,0.0786583567 Z M24.4397827,8.53889078 C24.1468092,8.24591737 23.6723523,8.24591737 23.3793789,8.53889078 C23.0864054,8.8318642 23.0864054,9.30682111 23.3793789,9.59929458 C24.7377556,10.9576713 25.4861877,12.7640075 25.4861877,14.6848332 C25.4861877,16.6061589 24.7377556,18.411995 23.3793789,19.7703718 C23.0864054,20.0633452 23.0864054,20.5378022 23.3793789,20.8307756 C23.5258656,20.9772623 23.7178481,21.0502557 23.9098307,21.0502557 C24.1018133,21.0502557 24.2937959,20.9772623 24.4402826,20.8307756 C26.0821336,19.1894245 26.9865516,17.0066225 26.9865516,14.6848332 C26.9855517,12.3630438 26.0816337,10.1802419 24.4397827,8.53889078 L24.4397827,8.53889078 Z M27.88597,5.09220349 C27.5929966,4.79923007 27.1185396,4.79923007 26.8255662,5.09220349 C26.5325928,5.38467696 26.5325928,5.86013382 26.8255662,6.15260729 C29.1048594,8.43190049 30.3597455,11.4621256 30.3597455,14.6848332 C30.3597455,17.9080407 29.1043594,20.9377659 26.8255662,23.2165591 C26.5325928,23.5095325 26.5325928,23.9839895 26.8255662,24.2769629 C26.9720529,24.4234496 27.1640355,24.496443 27.3560181,24.496443 C27.5480007,24.496443 27.7399832,24.4234496 27.8864699,24.2769629 C30.4487375,21.7156953 31.8596095,18.3085044 31.8596095,14.6848332 C31.8596095,11.0611619 30.4487375,7.65497098 27.88597,5.09220349 L27.88597,5.09220349 Z"
                fill={fill}
                fillRule="evenodd"
            />
        </svg>
    ),
    muted: ({ className, fill = '#ffffff' }) => (
        <svg
            className={className}
            viewBox="0 0 32 31"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            strokeMiterlimit="1.5"
        >
            <path
                d="M7.016,9.629c4.39,4.441 8.858,8.939 13.25,13.353l0,6.638c0,0.285 -0.161,0.545 -0.415,0.672c-0.106,0.052 -0.22,0.078 -0.335,0.078c-0.16,0 -0.319,-0.051 -0.451,-0.151l-11.235,-8.478l-6.323,0c-0.831,0 -1.507,-0.676 -1.507,-1.508l0,-9.095c0,-0.832 0.676,-1.508 1.507,-1.509l5.509,0Zm4.325,-2.649l7.724,-5.828c0.227,-0.172 0.531,-0.2 0.786,-0.073c0.254,0.127 0.415,0.387 0.415,0.671l0,14.154l-8.925,-8.924Z"
                fill={fill}
            />
            <path d="M3.085,2.465l24.972,24.96" stroke={fill} />
        </svg>
    ),
    cc: ({ className }) => <svg className={className} />,
    fullscreen: ({ className, fill = '#ffffff' }) => (
        <svg
            className={className}
            viewBox="0 0 17 17"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g fillRule="nonzero" fill={fill}>
                <polygon
                    points="9 2 12.6 2 8.6 6 10 7.4 14 3.4 14 7 16 7 16 0 9 0"
                />
                <polygon
                    points="6 8.6 2 12.6 2 9 0 9 0 16 7 16 7 14 3.4 14 7.4 10"
                />
            </g>
        </svg>
    ),
    exitFullscreen: ({ className, fill = '#ffffff' }) => (
        <svg
            className={className}
            viewBox="0 0 17 17"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g fill={fill} fillRule="evenodd">
                <polygon
                    points="1 12 4.6 12 0.6 16 2 17.4 6 13.4 6 17 8 17 8 10 1 10"
                />
                <polygon
                    points="16 0.6 12 4.6 12 1 10 1 10 8 17 8 17 6 13.4 6 17.4 2"
                />
            </g>
        </svg>
    ),
    facebook: ({ className, fill = '#ffffff' }) => (
        <svg
            className={className}
            viewBox="0 0 720 720"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            clipRule="evenodd"
        >
            <path
                d="M700.241,0.1c10.857,0 19.659,8.802 19.659,19.659c0,102.788 0,577.594 0,680.382c0,5.214 -2.071,10.214 -5.758,13.901c-3.687,3.687 -8.687,5.758 -13.901,5.758c-50.174,0 -179.041,0 -179.041,0l0,-295.4l86.6,0l11.7,-106.9l-98.3,0l0,-48.4c0,-14.8 1.6,-25.7 5.5,-32c5.5,-9.4 16.4,-14 33.5,-14l57.7,0l0,-106l-96.7,0c-19.5,0 -38.2,2.3 -60.1,10.9c-44.5,17.9 -67.1,60.1 -67.1,125.6l0,64l-62.4,0l0,106.9l62.4,0l0,295.4c0,0 -294.575,0 -374.241,0c-5.214,0 -10.214,-2.071 -13.901,-5.758c-3.687,-3.687 -5.758,-8.687 -5.758,-13.901c0,-102.797 0,-577.685 0,-680.482c0,-10.857 8.802,-19.659 19.659,-19.659c102.797,0 577.685,0 680.482,0Z"
                fill={fill}
                fillRule="nonzero"
                strokeLinejoin="round"
                strokeMiterlimit="1.41421"
            />
        </svg>
    )
};