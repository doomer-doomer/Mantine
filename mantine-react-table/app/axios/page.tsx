'use client'

import '../../css/home.css'
import { useQuery } from "@tanstack/react-query";
import { customQuery } from './axios';
import { Center, Flex, Image, Loader, Text } from '@mantine/core';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Meme } from '@/types/meme';

export default function Axios() {
  const { data, isPending, error } = useQuery(customQuery);

  const [selected, setSelected] = useState<{ id: string; url: string } | null>(null);

  if (isPending) {
    return (
      <div className="main">
        <Center>
          <Loader />
        </Center>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main">
        <Text color="red">Error fetching memes</Text>
      </div>
    );
  }

  const memes:Meme[] = data?.data?.memes ?? [];

  return (
    <div className="main">
      <h1>Axios Example</h1>

      <div className="work">
        <Flex wrap="wrap" gap="md" justify="center">
          {memes.map((item: Meme) => (
            <motion.div
            
              key={item.id}
              layoutId={item.id}
              onClick={() => setSelected({ id: item.id, url: item.url })}
              style={{ cursor: 'pointer' }}
              
            >
              <Image
                src={item.url}
                alt={item.name}
                width={200}
                height={300}
                radius="md"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.transition = 'transform 0.3s ease-in-out';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.transition = 'transform 0.3s ease-in-out';
                }}
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                }}
              />
            </motion.div>
          ))}
        </Flex>
      </div>

      {/* Overlay Hero Animation */}
      <AnimatePresence>
        {selected && (
          <motion.div
            layoutId={selected.id}
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0,0,0,0)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
              cursor: 'zoom-out',
            }}
          >
            <motion.img
              src={selected.url}
              style={{
                maxWidth: '80%',
                maxHeight: '80%',
                borderRadius: '16px',
                boxShadow: '0 0 40px rgba(0,0,0,0.5)',
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
