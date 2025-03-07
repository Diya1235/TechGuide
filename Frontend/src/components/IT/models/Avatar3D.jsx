import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const Avatar3D=({ role, taskCompleted }) =>{
  const avatarRef = useRef();
  const { scene } = useGLTF("./avatar.glb");

  // Animation: Slight floating effect when task is completed
  useFrame(() => {
    if (avatarRef.current) {
      avatarRef.current.position.y = taskCompleted ? Math.sin(Date.now() * 0.002) * 0.2 : 0;
    }
  });

  return <primitive ref={avatarRef} object={scene} scale={1.2} position={[0, -1.2, 0]} />;
}
export default Avatar3D;
