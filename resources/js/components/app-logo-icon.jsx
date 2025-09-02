import { SVGAttributes } from 'react';
import Logo from "@/../../public/assets/images/logo.png"

export default function AppLogoIcon({size}) {
    return (

        <img width={size} height={size} src={Logo} alt="" />
    );
}
