import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const AIEmployeesSection = () => {
  // Job roles data
  const jobRoles = [
    "Software Developer",
    "Network Administrator",
    "Cloud Architect",
    "Data Scientist",
    "AI/ML Engineer",
    "Cybersecurity Specialist",
    "DevOps Engineer",
    "UI/UX Designer",
    "Project Manager",
    "IT Support Specialist",
    "Database Administrator",
    "Business Analyst",
    "Web Developer",
    "Mobile Application Developer",
    "Site Reliability Engineer",
    "Blockchain Engineer",
    "Digital Marketing Manager"
  ];

  // Image paths
  const imagePaths = [
    "/gsai/1e3d8ee8-9f68-400d-a36e-cd6be12025fe.png",
    "/gsai/4ec809ac-6881-482b-99aa-6e2a18c68bd2.png",
    "/gsai/15bd96e9-e506-4e5c-ae95-21b451745f66.png",
    "/gsai/015fcb38-3160-4562-a72b-388873f85a78.png",
    "/gsai/43a41f06-f1b3-4f47-8112-8dd4d609cd66.png",
    "/gsai/55fae7d4-ed9d-4916-8e89-e3b0ec4b82d4 (1).png",
    "/gsai/55fae7d4-ed9d-4916-8e89-e3b0ec4b82d4.png",
    "/gsai/85bab06b-b7e2-494b-a9ac-ed30fb137b9e.png",
    "/gsai/347e52a4-4c9f-4fe6-bcf3-86f9078715a9.png",
    "/gsai/386e17ed-ad4a-43a7-a39b-5596344d04ee.png",
    "/gsai/414af05d-e7ef-4686-bc28-eb07c3663689.png",
    "/gsai/2353e7ff-ba5e-4267-b582-29ec15ab02ac.png",
    "/gsai/a001e6d4-ec11-4e34-a9e9-2df69c027513.png",
    "/gsai/a9b9a34a-bd72-4f6d-b422-03709a4413a3.png",
    "/gsai/a265dd34-f9b4-471c-9ca3-f864cbf74a6b.png",
    "/gsai/ae3b6e34-8b8f-4916-8694-33f75552fb67.png",
    "/gsai/astrologer.png"
  ];

  // Combine job roles with images
  const employees = jobRoles.map((role, index) => ({
    id: index,
    role,
    image: imagePaths[index % imagePaths.length]
  }));

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gradient-primary-start via-gradient-primary-end to-cyan-500 bg-clip-text text-transparent">
            AI Employees
          </h2>
          <p className="text-xl text-foreground max-w-3xl mx-auto">
            Meet our AI-powered workforce ready to assist with specialized tasks across various domains
          </p>
        </motion.div>

        <div className="relative">
          {/* Scrolling cards carousel */}
          <div className="overflow-hidden">
            <div className="flex animate-scroll-left whitespace-nowrap">
              {employees.map((employee, index) => (
                <motion.div
                  key={`${employee.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="inline-block mx-4"
                >
                  <Card className="bg-background/40 backdrop-blur-xl border-primary/20 hover:border-primary/50 transition-all w-64">
                    <CardContent className="p-6 text-center">
                      <div className="relative mb-4 mx-auto w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20">
                        <img
                          src={employee.image}
                          alt={employee.role}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {employee.role}
                      </h3>
                      <div className="inline-block px-3 py-1 bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end text-white text-xs rounded-full">
                        AI Employee
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              
              {/* Duplicate for seamless scrolling */}
              {employees.map((employee, index) => (
                <motion.div
                  key={`duplicate-${employee.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="inline-block mx-4"
                >
                  <Card className="bg-background/40 backdrop-blur-xl border-primary/20 hover:border-primary/50 transition-all w-64">
                    <CardContent className="p-6 text-center">
                      <div className="relative mb-4 mx-auto w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20">
                        <img
                          src={employee.image}
                          alt={employee.role}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {employee.role}
                      </h3>
                      <div className="inline-block px-3 py-1 bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end text-white text-xs rounded-full">
                        AI Employee
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default AIEmployeesSection;