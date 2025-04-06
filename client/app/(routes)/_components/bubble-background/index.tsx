import { useEffect, useRef } from "react";
import * as THREE from 'three';

interface BubbleUserData {
    speedY: number;
    speedX: number;
    speedRotation: number;
  }
  
type BubbleMesh = THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial> & {
  userData: BubbleUserData;
};

export const BubblesBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      if (!containerRef.current) return;
      
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      containerRef.current.appendChild(renderer.domElement);
      
      // Create bubbles
      const bubbles: BubbleMesh[] = [];
      const bubbleCount = 30;
      
      for (let i = 0; i < bubbleCount; i++) {
        const geometry = new THREE.SphereGeometry(Math.random() * 1 + 0.5, 32, 32);
        const material = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: Math.random() * 0.2 + 0.1
        });
        
        const bubble = new THREE.Mesh(geometry, material) as BubbleMesh;
        
        // Random position
        bubble.position.x = Math.random() * 40 - 20;
        bubble.position.y = Math.random() * 40 - 20;
        bubble.position.z = Math.random() * 30 - 15;
        
        // Random speed
        bubble.userData = {
          speedY: Math.random() * 0.03 + 0.01,
          speedX: Math.random() * 0.01 - 0.005,
          speedRotation: Math.random() * 0.01
        };
        
        scene.add(bubble);
        bubbles.push(bubble);
      }
      
      camera.position.z = 15;
      
      // Animation loop
      const animate = (): void => {
        requestAnimationFrame(animate);
        
        bubbles.forEach(bubble => {
          bubble.position.y += bubble.userData.speedY;
          bubble.position.x += bubble.userData.speedX;
          bubble.rotation.x += bubble.userData.speedRotation;
          bubble.rotation.y += bubble.userData.speedRotation;
          
          // Reset bubble position when it goes out of view
          if (bubble.position.y > 25) {
            bubble.position.y = -20;
            bubble.position.x = Math.random() * 40 - 20;
          }
        });
        
        renderer.render(scene, camera);
      };
      
      animate();
      
      // Handle window resize
      const handleResize = (): void => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      
      window.addEventListener('resize', handleResize);
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        if (containerRef.current) {
          containerRef.current.removeChild(renderer.domElement);
        }
        bubbles.forEach(bubble => {
          scene.remove(bubble);
          bubble.geometry.dispose();
          bubble.material.dispose();
        });
        renderer.dispose();
      };
    }, []);
    
    return <div ref={containerRef} className="fixed inset-0 pointer-events-none" />;
  };