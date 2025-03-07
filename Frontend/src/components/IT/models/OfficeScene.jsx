import { useGLTF } from "@react-three/drei";

export default function OfficeScene(props) {
  const { scene } = useGLTF("Office.glb", true);
  return <primitive object={scene} {...props} />;
}
