"use client";

import { useState, useEffect } from "react";

export function useCooldown(onCooldownStart: () => void) {
  // Definições de configuração do cooldown: duração e chave para armazenar no localStorage
  const COOLDOWN_DURATION = 60;
  const STORAGE_KEY = "resendCooldownStart";

  // Estados para controlar se o botão está desabilitado e quantos segundos faltam para liberar
  const [disabled, setDisabled] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  
  // Função que inicia o cooldown:
  // salva o timestamp atual no localStorage, ativa o estado de disabled e seta o tempo restante
  const startCooldown = () => {
    const now = Date.now();
    localStorage.setItem(STORAGE_KEY, now.toString());

    setDisabled(true);
    setSecondsLeft(COOLDOWN_DURATION);
    onCooldownStart(); // Chama a função passada como argumento para iniciar o cooldown
  };

  // Efeito executado ao montar o hook que verifica se já existe um cooldown em andamento
  // Se existir, calcula quanto tempo falta e atualiza os estados para manter o cooldown ativo
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const savedTime = parseInt(saved, 10);
      const elapsed = Math.floor((Date.now() - savedTime) / 1000);
      const remaining = COOLDOWN_DURATION - elapsed;

      if (remaining > 0) {
        setDisabled(true);
        setSecondsLeft(remaining);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Efeito que, enquanto o botão estiver desabilitado,
  // cria um intervalo para decrementar os segundos restantes a cada segundo
  // Quando o tempo chega a zero, limpa o intervalo, reativa o botão e remove o cooldown do localStorage
  useEffect(() => {
    if (!disabled) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setDisabled(false);
          localStorage.removeItem(STORAGE_KEY);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [disabled]);

  // Retorna os estados e a função para iniciar o cooldown, para ser usado em componentes
  return {
    disabled,
    secondsLeft,
    startCooldown,
  };
}
