<script setup lang="ts">
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { storeToRefs } from 'pinia';

interface Props {
    page: 'main' | 'faq'
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

// NAV OPEN INDICATOR
const baseStore = useBaseStore();
const { navOpenIndicator } = storeToRefs(baseStore);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INIT 3D MODEL AND ANIMATION
const initAnimation = (): void => {
    if (canvas.value !== null) return;
    
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
    // const ambient = new THREE.AmbientLight(0xA589B4);
    const ambient = new THREE.AmbientLight(0xEEEEEE);
    scene.add(ambient);

    // const directionalLight3 = new THREE.DirectionalLight(0x97C1FF, 1.2);
    // directionalLight3.position.set(15, 2, 1);
    // scene.add(directionalLight3);

    // const pointLight2 = new THREE.DirectionalLight(0x222222, 1);
    // // pointLight2.position.set(1, 10, -10);
    // pointLight2.position.set(-1, 20, 20);
    // scene.add(pointLight2);

    // spotLight = new THREE.SpotLight(0xE17ECF, 8.5);
    const spotLight = new THREE.SpotLight(0xE17ECF, 8.5);

    // if (props.page === 'main') {
    //     spotLight.position.set(-18, 10, 25);
    // } else if (props.page === 'faq') {
    //     spotLight.position.set(30, 15, 25);
    // }

    if (props.page === 'main') {
        spotLight.position.set(-18, 10, 45);
    } else if (props.page === 'faq') {
        spotLight.position.set(30, 15, 45);
    }

    // spotLight.castShadow = true;
    // spotLight.shadow.bias = -0.0001;
    // spotLight.shadow.mapSize.width = 1024*4;
    // spotLight.shadow.mapSize.height = 1024*4;
    scene.add(spotLight);

    // const spotLight2 = new THREE.SpotLight(0x9369A0, 5.5);
    const spotLight2 = new THREE.SpotLight(0xE17ECF, 5.5);

    // if (props.page === 'main') {
    //     spotLight2.position.set(28, 10, -25);
    // } else if (props.page === 'faq') {
    //     spotLight2.position.set(-40, 15, -25);
    // }

    if (props.page === 'main') {
        spotLight2.position.set(28, 12, 5);
    } else if (props.page === 'faq') {
        spotLight2.position.set(-40, 17, 5);
    }

    scene.add(spotLight2);

    // const spotLight2 = new THREE.SpotLight(0x9369A0, 5.5);
    const spotLight3 = new THREE.SpotLight(0xCCCCCC, 5.5);

    if (props.page === 'main') {
        spotLight3.position.set(40, 17, -35);
    } else if (props.page === 'faq') {
        spotLight3.position.set(-40, 17, -35);
    }

    scene.add(spotLight3);

    // const hemLlight = new THREE.HemisphereLight(0x222222, 0x080820, 4);
    // hemLlight.position.set(-18, 15, -25);
    // scene.add(hemLlight);

    // const pointLight3 = new THREE.PointLight(0xA589B4, 1, 500);
    // pointLight3.position.set(5, -11, 10);
    // scene.add(pointLight3);

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

    if (window.outerWidth < 1500 && window.outerHeight > 700 && window.outerWidth > 1300) {
        kermaModel.scale.set(1.3, 1.3, 1.3);
    }

    if (window.outerWidth < 1300 && window.outerHeight > 700 && window.outerWidth > 1000) {
        kermaModel.scale.set(1.2, 1.2, 1.2);
    }

    if (window.outerWidth < 1000 && window.outerHeight > 600 && window.outerWidth > 600) {
        kermaModel.scale.set(1, 1, 1);
    }

    if (window.outerWidth < 1000 && window.outerHeight < 600 && window.outerWidth > 600) {
        kermaModel.scale.set(1.35, 1.35, 1.35);
    }
    
    if (window.outerWidth < 700 && window.outerHeight > 600 && window.outerWidth > 600) {
        kermaModel.scale.set(1.1, 1.1, 1.1);
    }
    
    if (window.outerWidth < 850 && window.outerHeight > 1000) {
        kermaModel.scale.set(.9, .9, .9);
    }

    if (window.outerWidth < 600) {
        kermaModel.scale.set(.9, .9, .9);
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
// RESIZE 3D MODEL
const onWindowResize = (): void => {
    if (!camera) return;
    kermaModelScailing();

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight)
};

// RESTORE 3D ANIMATION ON NAVIGATION CLOSE
watch(navOpenIndicator, (newValue) => {
    if (!newValue) {
        requestAnimationFrame(animate);
    }
})

onMounted(() => {
    // DOM
    canvas.value = document.querySelector('.model-scene canvas');
    
    // INIT 3D MODEL AND ANIMATION
    initAnimation();

    // RESIZE
    window.addEventListener('resize', onWindowResize);
});

// CLEAN CANVAS
onBeforeUnmount(() => {
    sceneContainer.value.innerHTML = '';
})

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

    window.removeEventListener('resize', onWindowResize);
});

</script>

<template>
    <div ref="sceneContainer" :class="page" class="model-scene"></div>
</template>

<style lang="scss" scoped>
.model-scene {
    // position: absolute;
    position: fixed;
    // width: 100% !important;
    // height: 100% !important;
    width: 100% !important;
    height: 100% !important;
    // width: 100rem !important;
    // height: 60rem !important;
    // z-index: 200;

    @media only screen and (max-width: 850px) and (min-height: 600px) {
        position: absolute;
        top: 27%;
        right: 55%;
        transform: translateX(50%);
    }
}

.main {
    top: 0;
    // right: 20rem;
    // right: -35rem;
    // right: -22rem;
    right: -32rem;

    @media only screen and (max-width: 850px) and (min-height: 600px) {
        top: 27%;
        right: 55%;
        transform: translateX(50%);
    }

    @media only screen and (max-width: 850px) and (min-height: 1000px) {
        top: 22%;
    }

    @media only screen and (max-width: 850px) and (min-height: 600px) and (min-width: 600px) {
        right: 75%;
        // right: 55%;
    }

    @media only screen and (max-width: 750px) and (min-height: 600px) and (min-width: 600px) {
        right: 65%;
    }

    @media only screen and (max-width: 850px) and (max-height: 600px) {
        top: 7%;
    }
}

.faq {
    top: 0;
    // left: -55rem;
    left: -39rem;

    // @media only screen and (max-width: 1100px) {
    //     left: -50rem;
    // }

    // @media only screen and (max-width: 1000px) {
    //     left: -41rem;
    // }

    @media only screen and (max-width: 850px) and (min-height: 600px) {
        // top: -5%;
        top: -10%;
    //   transform: translateX(-50%);
        left: -80%;
    }

    @media only screen and (max-width: 850px) and (min-height: 1000px) {
        top: -22rem;
    }

    @media only screen and (max-width: 750px) and (min-height: 600px) {
        // left: 25%;
        left: -67%;
    }

    @media only screen and (max-width: 600px) {
        // left: 40%;
        left: -60%;
    }
}
</style>