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
let clock: any = null;
let delta: number = 0;
let clipsBase: any[] = [];
let clipsProgressState: any[] = [];
let clipsHello: any[] = [];
let clipsCircle: any[] = [];
let clipsHandsMovement: any[] = [];
let actionsBase: any[] = [];
let actionsProgressState: any[] = [];
let actionsHello: any[] = [];
let actionsCircle: any[] = [];
let actionsHandsMovement: any[] = [];

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
const { navOpenIndicator, isNewBetPlaced, gameState, timeBetweenGamesMs, triggerAnimation, triggerAnimationIndicator } = storeToRefs(baseStore);

// PREVIOUS WINDOW WIDTH FOR RESIZE
let prevWidth: number = 0;

// LOAD INDICATORS
let isModelLoaded = ref<boolean>(false);
let isProgressStateModelLoaded = ref<boolean>(false);
let isHelloModelLoaded = ref<boolean>(false);
let isCircleModelLoaded = ref<boolean>(false);
let isHandsMovementModelLoaded = ref<boolean>(false);
let greetAnimationFinished = ref<boolean>(false);

// MODEL CLICK
let modelClickCount = ref<number>(0);
let clickAnimationIndicator = ref<boolean>(false);


watchEffect(() => {
    if (!greetAnimationFinished.value && !isNewBetPlaced.value) return;
    if (isNewBetPlaced.value) {
        // actionsBase.forEach((action, i) => {
        //     action.stop();
        // });

        // actionsHello.forEach((action, i) => {
        //     action.stop();
        // });

        // actionsCircle.forEach((action, i) => {
        //     action.stop();
        // });

        // actionsProgressState.forEach((action, i) => {
        //     action.stop();
        // });

        actionsHandsMovement.forEach((action, i) => {
            action.setLoop(THREE.LoopOnce);
            action.play();
        });

        const dueTo = new Date(+new Date()+actionsHandsMovement[1]._clip.duration * 1000);

        const timeout = () => {
            if (new Date() < dueTo) {
                window.setTimeout(timeout, 30);
            } else {
                baseStore.isNewBetPlacedToFalse();
                greetAnimationFinished.value = true;

                actionsBase[1].stop();
                actionsHandsMovement.forEach((action, i) => {
                    action.stop();
                });
            }
        };
        timeout();

        // setTimeout(() => {
        //     baseStore.isNewBetPlacedToFalse();
        //     greetAnimationFinished.value = true;
        // }, actionsBase[0]._clip.duration * 1000 - 9900);
        return;
    }

    if (gameState.value === 'ended') {
        actionsBase.forEach((action, i) => {
            if (i === 0) return;
            action.stop();
        });
        actionsBase[0].setLoop(THREE.LoopOnce);
        actionsBase[0].play();

        const dueTo = new Date(+new Date()+timeBetweenGamesMs.value);

        const timeout = () => {
            if (new Date() < dueTo) {
                window.setTimeout(timeout, 30);
            } else {
                gameState.value = 'started';
            }
        };
        timeout();

        // setTimeout(() => {
        //     gameState.value = 'started';
        // }, timeBetweenGamesMs.value);

        const dueTo2 = new Date(+new Date()+actionsBase[0]._clip.duration * 1000 - 9220);

        const timeout2 = () => {
            if (new Date() < dueTo2) {
                window.setTimeout(timeout2, 30);
            } else {
                actionsBase[0].stop();
            }
        };
        timeout2();

        // setTimeout(() => {
        //     actionsBase[0].stop();
        // }, actionsBase[0]._clip.duration * 1000 - 9220);
        return;
    }

    if (gameState.value === 'started') {
        const dueTo = new Date(+new Date()+5000);

        const timeout = () => {
            if (new Date() < dueTo) {
                window.setTimeout(timeout, 30);
            } else {
                gameState.value = 'progress';
            }
        };
        timeout();

        // setTimeout(() => {
        //     gameState.value = 'progress';
        // }, actionsBase[0]._clip.duration * 1000 - 9900);
        return;
    }

    if (clickAnimationIndicator.value) {
        actionsBase.forEach((action, i) => {
            action.stop();
        });

        actionsHello.forEach((action, i) => {
            action.stop();
        });

        actionsHandsMovement.forEach((action, i) => {
            action.stop();
        });
        
        actionsCircle.forEach((action, i) => {
            action.setLoop(THREE.LoopOnce);
            action.play();
        });

        const dueTo = new Date(+new Date()+actionsCircle[1]._clip.duration * 1000);

        const timeout = () => {
            if (new Date() < dueTo) {
                window.setTimeout(timeout, 30);
            } else {
                actionsCircle.forEach((action, i) => {
                    action.stop();
                });
                clickAnimationIndicator.value = false;
                modelClickCount.value = 0
            }
        };
        timeout();

        return;
    }

    if (gameState.value === 'progress' && triggerAnimationIndicator.value) {
        triggerAnimationIndicator.value = false;
        
        actionsCircle.forEach((action, i) => {
            action.setLoop(THREE.LoopOnce);
            action.play();
        });

        const dueTo = new Date(+new Date()+actionsCircle[1]._clip.duration * 1000);

        const timeout = () => {
            if (new Date() < dueTo) {
                window.setTimeout(timeout, 30);
            } else {
                actionsCircle.forEach((action, i) => {
                    action.stop();
                });

            }
        };
        timeout();

        // if (triggerAnimation.value === 'position') {
        //     actionsBase[1].setLoop(THREE.LoopOnce);
        //     actionsBase[1].play();

        //     const dueTo = new Date(+new Date()+actionsBase[1]._clip.duration * 1000);

        //     const timeout = () => {
        //         if (new Date() < dueTo) {
        //             window.setTimeout(timeout, 30);
        //         } else {
        //             actionsBase[1].stop();
        //         }
        //     };
        //     timeout();
        // } else if (triggerAnimation.value === 'rotation') {
        //     actionsBase[1].setLoop(THREE.LoopOnce);
        //     actionsBase[1].play();

        //     const dueTo = new Date(+new Date()+actionsBase[1]._clip.duration * 1000);

        //     const timeout = () => {
        //         if (new Date() < dueTo) {
        //             window.setTimeout(timeout, 30);
        //         } else {
        //             actionsBase[1].stop();
        //         }
        //     };
        //     timeout();
        // }

        return;
    }

    const dueTo = new Date(+new Date()+680);

    const timeout = () => {
        if (new Date() < dueTo) {
            window.setTimeout(timeout, 30);
        } else {
            actionsBase.forEach((action, i) => {
            action.stop();
        });
        }
    };
    timeout();

    // setTimeout(() => {
    //     actionsBase.forEach((action, i) => {
    //         action.stop();
    //     });
    // }, 680);
    actionsProgressState.forEach((action, i) => {
        action.play();
    });
    // }
});

watchEffect(() => {
    if (isModelLoaded.value && isProgressStateModelLoaded.value) {
        actionsProgressState = clipsProgressState.map(clip => {
            return mixer.clipAction(clip);
        });
        actionsProgressState.forEach((action, i) => {
            action.play();
        });
    }
});

watchEffect(() => {
    if (isModelLoaded.value && isHelloModelLoaded.value) {
        actionsHello = clipsHello.map(clip => {
            return mixer.clipAction(clip);
        });
        actionsHello.forEach((action, i) => {
            action.setLoop(THREE.LoopOnce);
            action.play();
        });

        const dueTo = new Date(+new Date()+actionsHello[0]._clip.duration * 1000);

        const timeout = () => {
            if (new Date() < dueTo) {
                window.setTimeout(timeout, 30);
            } else {
                greetAnimationFinished.value = true;
            }
        };
        timeout();
    }
});

watchEffect(() => {
    if (isModelLoaded.value && isCircleModelLoaded.value) {
        actionsCircle = clipsCircle.map(clip => {
            return mixer.clipAction(clip);
        });
        // actionsCircle.forEach((action, i) => {
        //     action.play();
        // });
    }
});

watchEffect(() => {
    if (isModelLoaded.value && isHandsMovementModelLoaded.value) {
        actionsHandsMovement = clipsHandsMovement.map(clip => {
            return mixer.clipAction(clip);
        });
        // actionsHandsMovement.forEach((action, i) => {
        //     action.play();
        // });
    }
});

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
    renderer.setPixelRatio(window.devicePixelRatio);
    if (props.page === 'game') {
        renderer.setSize(window.innerWidth * 1.2, window.innerHeight * 1.2);
    } else {
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
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

    if (props.page === 'game') {
        loader.load(baseUrl + 'kermaModelGame.glb', (gltf) => {
            kermaModel = gltf.scene;
            scene.add(kermaModel);

            kermaModel.position.y = -2;
            kermaModel.position.x = -1;
            
            kermaModelScailing();

            clipsBase = gltf.animations;
            
            mixer = new THREE.AnimationMixer(kermaModel);

            actionsBase = clipsBase.map(clip => {
                return mixer.clipAction(clip);
            });
            
            isModelLoaded.value = true;
            animate();
        });

        loader.load(baseUrl + 'kermaModel.glb', (gltf) => {
            clipsProgressState = gltf.animations;
            isProgressStateModelLoaded.value = true;
        });

        loader.load(baseUrl + 'hello.glb', (gltf) => {
            clipsHello = gltf.animations;
            isHelloModelLoaded.value = true;
        });

        loader.load(baseUrl + 'krug.glb', (gltf) => {
            clipsCircle = gltf.animations;
            isCircleModelLoaded.value = true;
        });

        loader.load(baseUrl + 'tudaSuda.glb', (gltf) => {
            clipsHandsMovement = gltf.animations;
            isHandsMovementModelLoaded.value = true;
        });
    } else {
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

            clipsBase = gltf.animations;
            
            mixer = new THREE.AnimationMixer(kermaModel);
            clipsBase.forEach(clip => {
                const action = mixer.clipAction(clip);
                action.play();
            });

            // renderer.render( scene, camera );
            animate();
        });
    }


    // ANIMATION
    clock = new THREE.Clock();
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SCALE 3D MODEL
const kermaModelScailing = (): void => {
    if (!kermaModel) return;
    kermaModel.scale.set(1.4, 1.4, 1.4);
    
    if (props.page === 'game') {
        kermaModel.scale.set(.85, .85, .85);
    }

    if (window.outerWidth < 1500 && window.outerHeight > 700 && window.outerWidth > 1300) {
        kermaModel.scale.set(1.3, 1.3, 1.3);
    
        if (props.page === 'game') {
            kermaModel.scale.set(.75, .75, .75);
        }
    }

    if (window.outerWidth < 1300 && window.outerHeight > 700 && window.outerWidth > 1000) {
        kermaModel.scale.set(1.2, 1.2, 1.2);
    
        if (props.page === 'game') {
            kermaModel.scale.set(.65, .65, .65);
        }
    }

    if (window.outerWidth < 1000 && window.outerHeight > 600 && window.outerWidth > 600) {
        kermaModel.scale.set(1, 1, 1);
    
        if (props.page === 'game') {
            kermaModel.scale.set(.65, .65, .65);
        }
    }

    if (window.outerWidth < 1300 && window.outerHeight > 900 && window.outerWidth > 1000) {
        kermaModel.scale.set(.8, .8, .8);
    
        if (props.page === 'game') {
            kermaModel.scale.set(.45, .45, .45);
        }
    }

    if (window.outerWidth < 1000 && window.outerHeight < 600 && window.outerWidth > 600) {
        kermaModel.scale.set(1.35, 1.35, 1.35);
    
        if (props.page === 'game') {
            kermaModel.scale.set(.8, .8, .8);
        }
    }

    if (window.outerWidth < 850 && window.outerHeight > 600 && window.outerWidth > 600 && props.page === 'game') {
        kermaModel.scale.set(.55, .55, .55);
    }
    
    if (window.outerWidth < 700 && window.outerHeight > 600 && window.outerWidth > 600) {
        kermaModel.scale.set(1.1, 1.1, 1.1);
    
        if (props.page === 'game') {
            kermaModel.scale.set(.55, .55, .55);
        }
    }
    
    if (window.outerWidth < 850 && window.outerHeight > 1000) {
        kermaModel.scale.set(.9, .9, .9);
    
        if (props.page === 'game') {
            kermaModel.scale.set(.55, .55, .55);
        }
    }

    if (window.outerWidth <= 600) {
        kermaModel.scale.set(.9, .9, .9);
    
        if (props.page === 'game') {
            kermaModel.scale.set(.55, .55, .55);
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
    const valueX = -(event.clientX / window.innerWidth) * .7 - -0.3;
    const valueY = (event.clientY / window.innerHeight) * .7 + -0.4;

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

       if (props.page === 'game') {
            renderer.setSize(window.innerWidth * 1.2, window.innerHeight * 1.2);
        } else {
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        prevWidth = window.outerWidth;
    }, timeoutTime);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MODEL CLICK EVENT
const modelClickEvent = (): void => {  
    if (modelClickCount.value >= 2 || isNewBetPlaced.value) return;
    modelClickCount.value++;

    if (modelClickCount.value === 2) {
        clickAnimationIndicator.value = true;
    }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CHECK IF DEVICE IS MOBILE OR TABLET
const isTouchDevice = (): boolean => {  
    return ('ontouchstart' in window) ||  
      (navigator.maxTouchPoints > 0);
};

// RESTORE 3D ANIMATION ON NAVIGATION CLOSE
watch(navOpenIndicator, (newValue) => {
    if (!newValue) {
        requestAnimationFrame(animate);
    }
});

onMounted(() => {
    if (isTouchDevice()) return;
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
    clock = null;

    window.removeEventListener('resize', () => onWindowResize('resize'));
    window.removeEventListener('orientationchange', () => onWindowResize('orientationchange'));
    html.value.removeEventListener('mousemove', onMouseMove);
});

</script>

<template>
    <div @click="modelClickEvent" ref="sceneContainer" :class="page" class="model-scene"></div>
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
    // top: 18%;
    top: -12%;
    // left: -40%;
    left: -45%;
    z-index: 500;

    @media only screen and (max-width: 850px) {
        position: absolute;
        transform: translateX(50%);
    }

    @media only screen and (max-width: 850px) and (min-height: 600px) {
        top: -33%;
        left: -100%;
    }

    @media only screen and (max-width: 850px) and (min-height: 1000px) {
        top: calc(-22rem + -32%);
        left: -100%;
    }

    @media only screen and (max-width: 850px) and (max-height: 600px) {
        top: -11%;
        left: -85%;
        right: auto;
    }

    @media only screen and (max-width: 600px) and (min-height: 600px) {
        top: -22%;
        left: -80%;
    }

    @media only screen and (max-width: 600px) and (min-height: 700px) {
        top: -27%;
    }

    @media only screen and (max-width: 600px) and (min-height: 800px) {
        top: -31%;
    }

    @media only screen and (max-width: 600px) and (max-height: 600px) {
        top: -14%;
    }
}
</style>