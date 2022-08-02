<script setup lang="ts">
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { storeToRefs } from 'pinia';

const { $gsap } = useNuxtApp();

interface Props {
    page: 'main' | 'faq' | 'game';
}

const props = defineProps<Props>();

// GET BASE URL
const baseUrl = useBaseStore().baseUrl;

// THREE JS ESSENTIALS
let scene: any = null;
let renderer: any = null;
let camera: any = null;
let kermaModel: any = null;

// LOADERS
let loader: any = null;
let dracoLoader: any = null;

// ANIMATION
let mixer: any = null;
let clips: any[] = [];
let clock: any = null;
let delta: number = 0;

// CAMERA SETTINGS
let fov = ref<number>(35);
let aspect = ref<number>(2);
let near = ref<number>(0.1);
let far = ref<number>(600);

// DOM
let canvas = ref<HTMLCanvasElement | null>(null);
let sceneContainer = ref<HTMLElement | null>(null);

// HTML DOM ELEMENT
let html = ref<HTMLElement | null>(null);

// NAV OPEN INDICATOR
const baseStore = useBaseStore();
const { navOpenIndicator } = storeToRefs(baseStore);

// PREVIOUS WINDOW WIDTH FOR RESIZE
let prevWidth: number = 0;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INIT 3D MODEL AND ANIMATION
const initAnimation = (): void => {
    // if (canvas.value !== null) return;
    
    // SCENE
    scene = new THREE.Scene();


    // CAMERA SETUP
    fov.value = 35;
    aspect.value = window.innerWidth / window.innerHeight;
    near.value = 1;
    far.value = 600;
    camera = new THREE.PerspectiveCamera(fov.value, aspect.value, near.value, far.value);

    if (props.page === 'main') {
        camera.position.set(8, 2, 15);
    } else if (props.page === 'faq') {
        camera.position.set(-8, 2, 15.5);
    } else if (props.page === 'game') {
        camera.position.set(-8, 2, 15.5);
    }
    camera.lookAt(scene.position);


    // RENDERER SETUP
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.outputEncoding = THREE.sRGBEncoding;
    sceneContainer.value.appendChild(renderer.domElement);


    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 1.25;
    // renderer.toneMappingExposure = 2.3;

    // renderer.shadowMap.enabled = true;


    // LIGHTNING SETUP
    const ambient = new THREE.AmbientLight(0xEEEEEE);
    scene.add(ambient);

    const spotLight = new THREE.SpotLight(0xE17ECF, 8.5);

    if (props.page === 'main') {
        spotLight.position.set(-18, 10, 45);
    } else if (props.page === 'faq') {
        spotLight.position.set(30, 15, 45);
    } else if (props.page === 'game') {
        spotLight.position.set(30, 15, 45);
    }

    // spotLight.castShadow = true;
    // spotLight.shadow.bias = -0.0001;
    // spotLight.shadow.mapSize.width = 1024*4;
    // spotLight.shadow.mapSize.height = 1024*4;
    scene.add(spotLight);

    const spotLight2 = new THREE.SpotLight(0xE17ECF, 5.5);

    if (props.page === 'main') {
        spotLight2.position.set(28, 12, 5);
    } else if (props.page === 'faq') {
        spotLight2.position.set(-40, 17, 5);
    } else if (props.page === 'game') {
        spotLight2.position.set(-40, 17, 5);
    }

    scene.add(spotLight2);

    const spotLight3 = new THREE.SpotLight(0xCCCCCC, 5.5);

    if (props.page === 'main') {
        spotLight3.position.set(40, 17, -35);
    } else if (props.page === 'faq') {
        spotLight3.position.set(-40, 17, -35);
    } else if (props.page === 'game') {
        spotLight3.position.set(-40, 17, -35);
    }

    scene.add(spotLight3);

    // LOAD SETUP
    dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('jst/libs/draco/gltf');


    loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load(baseUrl + 'kermaModel.glb', (gltf) => {
        kermaModel = gltf.scene;
        scene.add(kermaModel);
        // kermaModel.traverse(n => {
        //     if (n.isMesh) {
        //         n.castShadow = true;
        //         n.receiveShadow = true;

        //         if (n?.material?.map) n.material.map.anisotropy = 16;
        //     }
        // })
        
        kermaModelScailing();

        clips = gltf.animations;
        
        mixer = new THREE.AnimationMixer(kermaModel);
        clips.forEach(clip => {
            mixer.clipAction(clip).play();
        })

        // renderer.render( scene, camera );
        animate();
    });


    // ANIMATION
    clock = new THREE.Clock();
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SCALE 3D MODEL
const kermaModelScailing = (): void => {
    if (!kermaModel) return;
    kermaModel.scale.set(1.4, 1.4, 1.4);
    
    if (props.page === 'game') {
        kermaModel.scale.set(1, 1, 1);
    }

    if (window.outerWidth < 1500 && window.outerHeight > 700 && window.outerWidth > 1300) {
        kermaModel.scale.set(1.3, 1.3, 1.3);
    
        if (props.page === 'game') {
            kermaModel.scale.set(.9, .9, .9);
        }
    }

    if (window.outerWidth < 1300 && window.outerHeight > 700 && window.outerWidth > 1000) {
        kermaModel.scale.set(1.2, 1.2, 1.2);
    
        if (props.page === 'game') {
            kermaModel.scale.set(.8, .8, .8);
        }
    }

    if (window.outerWidth < 1000 && window.outerHeight > 600 && window.outerWidth > 600) {
        kermaModel.scale.set(1, 1, 1);
    
        if (props.page === 'game') {
            kermaModel.scale.set(.8, .8, .8);
        }
    }

    if (window.outerWidth < 1300 && window.outerHeight > 900 && window.outerWidth > 1000) {
        kermaModel.scale.set(.8, .8, .8);
    
        if (props.page === 'game') {
            kermaModel.scale.set(.6, .6, .6);
        }
    }

    if (window.outerWidth < 1000 && window.outerHeight < 600 && window.outerWidth > 600) {
        kermaModel.scale.set(1.35, 1.35, 1.35);
    
        if (props.page === 'game') {
            kermaModel.scale.set(.95, .95, .95);
        }
    }

    if (window.outerWidth < 850 && window.outerHeight > 600 && window.outerWidth > 600 && props.page === 'game') {
        kermaModel.scale.set(.7, .7, .7);
    }
    
    if (window.outerWidth < 700 && window.outerHeight > 600 && window.outerWidth > 600) {
        kermaModel.scale.set(1.1, 1.1, 1.1);
    
        if (props.page === 'game') {
            kermaModel.scale.set(.7, .7, .7);
        }
    }
    
    if (window.outerWidth < 850 && window.outerHeight > 1000) {
        kermaModel.scale.set(.9, .9, .9);
    
        if (props.page === 'game') {
            kermaModel.scale.set(.7, .7, .7);
        }
    }

    if (window.outerWidth <= 600) {
        kermaModel.scale.set(.9, .9, .9);
    
        if (props.page === 'game') {
            kermaModel.scale.set(.7, .7, .7);
        }
    }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ANIMATE 3D MODEL
const animate = (): void => {
    if (!clock || !renderer || navOpenIndicator.value) return;
    delta = clock.getDelta();
    
    if (mixer) {
        mixer.update(delta);
    }

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MOVE CAMERA ON MOUSEMOVE
const onMouseMove = (event: MouseEvent): void => {
    if (props.page !== 'main' && props.page !== 'faq') return;
    const valueX = -(event.clientX / window.innerWidth) * .8 - -0.3;
    const valueY = (event.clientY / window.innerHeight) * .8 + -0.4;

    kermaModel.position.x = $gsap.utils.interpolate(kermaModel.position.x, valueX, 0.03);
    kermaModel.position.y = $gsap.utils.interpolate(kermaModel.position.y, valueY, 0.03);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RESIZE 3D MODEL
const onWindowResize = (eventType: 'resize' | 'orientationchange'): void => {
    if (!camera || eventType === 'resize' && Math.abs(window.outerWidth - prevWidth) < 100) return;

    let timeoutTime = 0;
    if (eventType === 'orientationchange') {
        timeoutTime = 150;
    }
    setTimeout(() => {
        kermaModelScailing();

        camera.aspect = window.innerWidth / window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

        prevWidth = window.outerWidth;
    }, timeoutTime);
};

// RESTORE 3D ANIMATION ON NAVIGATION CLOSE
watch(navOpenIndicator, (newValue) => {
    if (!newValue) {
        requestAnimationFrame(animate);
    }
});

onMounted(() => {
    // DOM
    canvas.value = document.querySelector('.model-scene canvas');

    // INIT 3D MODEL AND ANIMATION
    initAnimation();

    prevWidth = window.outerWidth;

    // RESIZE
    window.addEventListener('resize', () => onWindowResize('resize'));
    window.addEventListener('orientationchange', () => onWindowResize('orientationchange'));

    html.value = document.querySelector('html');
    html.value.addEventListener('mousemove', onMouseMove);
});

// CLEAN THREE JS DATA
onUnmounted(() => {
    sceneContainer.value = null;

    scene = null;
    renderer = null;
    camera = null;
    kermaModel = null;

    mixer = null;
    clips = [];
    clock = null;

    window.removeEventListener('resize', () => onWindowResize('resize'));
    window.removeEventListener('orientationchange', () => onWindowResize('orientationchange'));
    html.value.removeEventListener('mousemove', onMouseMove);
});

</script>

<template>
    <div ref="sceneContainer" :class="page" class="model-scene"></div>
</template>

<style lang="scss" scoped>
.model-scene {
    position: fixed;
    width: 100% !important;
    height: 100% !important;
    transition: all .3s !important;

    @media only screen and (max-width: 850px) and (min-height: 600px),
    only screen and (max-width: 600px) {
        position: absolute;
        top: 27%;
        right: 55%;
        transform: translateX(50%);
    }
}

.main {
    top: 0;
    right: -32rem;

    @media only screen and (max-width: 850px) and (min-height: 600px),
    only screen and (max-width: 600px) {
        top: 27%;
        right: 55%;
        transform: translateX(50%);
    }

    @media only screen and (max-width: 850px) and (min-height: 1000px) {
        top: 22%;
    }

    @media only screen and (max-width: 850px) and (min-height: 600px) and (min-width: 600px) {
        right: 75%;
    }

    @media only screen and (max-width: 750px) and (min-height: 600px) and (min-width: 600px) {
        right: 65%;
    }

    @media only screen and (max-width: 850px) and (max-height: 600px) and (min-width: 600px) {
        top: 7%;
    }
}

.faq {
    top: 0;
    left: -39rem;

    @media only screen and (max-width: 850px) and (min-height: 600px),
    only screen and (max-width: 600px) {
        top: -10%;
        left: -80%;
    }

    @media only screen and (max-width: 850px) and (min-height: 1000px) {
        top: -22rem;
    }

    @media only screen and (max-width: 750px) and (min-height: 600px) {
        left: -67%;
    }

    @media only screen and (max-width: 600px) {
        left: -60%;
    }
}

.game {
    top: 18%;
    left: -40%;
    z-index: 500;

    @media only screen and (max-width: 850px) {
        position: absolute;
    }

    @media only screen and (max-width: 850px) and (min-height: 600px) {
        top: -3%;
        left: -110%;
    }

    @media only screen and (max-width: 850px) and (max-height: 750px) {
        top: -1%;
    }

    @media only screen and (max-width: 850px) and (max-height: 600px) {
        top: 5%;
        left: -80%;
        right: auto;
        transform: translateX(50%); 
    }

    @media only screen and (max-width: 850px) and (min-height: 1000px) {
        top: -22rem;
    }

    @media only screen and (max-width: 600px) and (min-height: 600px) {
        top: -3%;
        left: -90%;
    }

    @media only screen and (max-width: 600px) and (max-height: 750px) {
        top: -1%;
    }

    @media only screen and (max-width: 600px) and (max-height: 600px) {
        top: 2%;
    }
}
</style>