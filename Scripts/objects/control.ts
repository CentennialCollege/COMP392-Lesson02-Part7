/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        public perspective:string = "Perspective";
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor() {
        }
        
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        public switchCamera(): void {
            if (camera instanceof PerspectiveCamera) {
                    camera = new OrthographicCamera(
                        window.innerWidth / - 16, 
                        window.innerWidth / 16, 
                        window.innerHeight / 16, 
                        window.innerHeight / - 16, -200, 500 );
                    camera.position.x = 3;
                    camera.position.y = 1;
                    camera.position.z = 3;
                    camera.lookAt(scene.position);
                    this.perspective = "Orthographic";
                } else {
                    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                    camera.position.x = 120;
                    camera.position.y = 60;
                    camera.position.z = 180;

                    camera.lookAt(scene.position);
                    this.perspective = "Perspective";
                }
        }
    }
}
