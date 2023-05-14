import React from 'react';
import { motion } from 'framer-motion'
import '../404/404styles.css'
import ups from '../../../enrollment-system/assets/ups.png'


export default function NotFoundPage() {
    return (
      <div className="not-found-page">
        <motion.img initial={{y:-200}} animate={{y:-10}} transition={{duration: 2}}
        src={ups} alt="ups"/>
        <h1>404 - Página No Encontrada</h1>
        <p>Ups, parece que esta página no existe.</p>
      </div>
    );
  }

