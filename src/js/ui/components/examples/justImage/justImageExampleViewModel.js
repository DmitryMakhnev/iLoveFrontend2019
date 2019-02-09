import { registerInjection } from 'diii';
import { action, observable } from 'mobx';



@registerInjection
export class JustImageExampleViewModel {

    @observable.ref
    imageFile = null;

    @observable.ref
    imgSrc = null;

    @action.bound
    onImageChange(e) {
        const imageFile = e.target.files[0];
        if (imageFile) {
            this.imageFile = imageFile;
            this.imgSrc = URL.createObjectURL(imageFile);
        }
    }

}

