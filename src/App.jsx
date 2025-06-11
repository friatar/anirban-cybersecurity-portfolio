import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Secure VANET Routing",
    description: "Modified AODV protocol using NS-3 and SUMO for secure VANET communication.",
    link: "https://github.com/anirban-secure-vanet"
  },
  {
    title: "JARVIS Assistant",
    description: "Voice and text-based assistant project using Python, integrated on Kali Linux.",
    link: "https://github.com/anirban-jarvis"
  },
  {
    title: "Online Voting System",
    description: "Full-stack app with secure backend handling built for academic project.",
    link: "https://github.com/anirban-voting-system"
  }
];

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 font-sans">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex flex-col items-center">
          <img src="/my-photo.jpg" alt="Anirban" className="w-32 h-32 rounded-full shadow-xl border-4 border-white mb-4" />
          <h1 className="text-4xl font-bold mb-2">Anirban Tarafdar</h1>
          <p className="text-lg mb-4 text-gray-300">Cybersecurity Enthusiast & Final Year CSE Student</p>
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <a href="mailto:anirban@example.com"><Mail className="mr-2" /> Contact</a>
            </Button>
            <Button asChild>
              <a href="https://github.com/anirban" target="_blank"><Github className="mr-2" /> GitHub</a>
            </Button>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="text-3xl font-semibold mb-6 text-center">🚀 Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="bg-gray-900 text-white border-gray-700 shadow-md">
                  <CardContent className="p-5">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline inline-flex items-center">
                      View Project <ArrowRight className="ml-1 w-4 h-4" />
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
}
