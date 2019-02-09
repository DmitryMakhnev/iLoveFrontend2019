import { detectMobile } from './libs/device/deviceUtils';
import { registerInjection } from 'diii';


@registerInjection
export class DeviceData {

    isMobile = detectMobile();

}

