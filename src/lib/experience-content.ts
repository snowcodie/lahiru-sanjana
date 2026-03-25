export type ExperienceContentItem = {
  period: string;
  titleKey:
    | "home.experience.itemTitleAssociateConsultantSapAbap"
    | "home.experience.itemTitleSoftwareEngineer"
    | "home.experience.itemTitleSoftwareEngineerIntern";
  company: string;
  description: string;
  bullets: string[];
  align: "left" | "right";
};

export const experienceContent: ExperienceContentItem[] = [
  {
    period: "Aug 2024 - Present",
    titleKey: "home.experience.itemTitleAssociateConsultantSapAbap",
    company: "Rizing Consumer Industries - MAS Project",
    description:
      "Designed and analyzed enhancements for enterprise ABAP systems to improve performance and UX. Contributed to SAP-integrated web solutions, optimized database queries and business logic, worked with OData services, SmartForms, ABAP enhancements, and gained exposure to SAP BTP, SAP Fiori, and IDoc processing.",
    bullets: [
      "Designed and analysed enhancements for existing enterprise ABAP systems to improve performance and UX.",
      "Contributed to the design and improvement of web-based solutions integrated with enterprise backend systems.",
      "Gained exposure to SAP Business Technology Platform (BTP) and SAP Fiori applications.",
      "Optimized database queries and business logic, reducing execution time and improving overall system efficiency.",
      "Customized and maintained SmartForms for dynamic business document generation, ensuring accurate and optimized output.",
      "Worked with OData services to enable seamless integration between SAP backend and web-based applications.",
      "Gained hands-on experience with IDoc processing, including monitoring and basic troubleshooting of data exchange between systems.",
      "Supported ABAP Enhancements to extend standard SAP functionality based on business requirements.",
    ],
    align: "left",
  },
  {
    period: "May 2024 - Jul 2024",
    titleKey: "home.experience.itemTitleSoftwareEngineer",
    company: "Hela Apparel Holdings",
    description:
      "Enhanced the e-shipping tool to improve shipment handling efficiency and implemented automated email tools based on R&D outcomes, helping streamline internal operational processes.",
    bullets: [
      "Enhanced the e-shipping tool to improve shipment handling efficiency.",
      "Designed and implemented automated email tools based on R&D outcomes.",
    ],
    align: "right",
  },
  {
    period: "Nov 2023 - May 2024",
    titleKey: "home.experience.itemTitleSoftwareEngineerIntern",
    company: "Hela Apparel Holdings",
    description:
      "Developed ABAP reports and utilities, optimized SAP HANA queries, automated workflows with email notifications and ALV improvements, and contributed to the development of the shipment management system.",
    bullets: [
      "Developed ABAP reports and utilities to support operational needs.",
      "Worked with SAP HANA to optimize queries and improve performance.",
      "Automated workflows including email notifications and ALV UI improvements.",
      "Contributed to shipment management system development.",
    ],
    align: "left",
  },
];
