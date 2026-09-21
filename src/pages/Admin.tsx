import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Trash2,
  Edit3,
  UploadCloud,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  ExternalLink,
  Github,
  Sparkles,
  FolderPlus,
  RefreshCw,
  Image as ImageIcon,
  ShieldAlert,
  ArrowLeft,
  X,
  Camera,
  MapPin,
  Calendar,
  Heart,
  Award,
  Search,
  Share2,
  Globe,
  MessageCircle,
  Send,
  Code2,
  Twitter,
  Instagram,
  Youtube,
  Facebook,
  Mail,
  Linkedin,
  Crop as CropIcon,
} from "lucide-react";
import {
  loginAdminWithEmail,
  logoutAdmin,
  subscribeToAuthState,
  getAuthErrorMessage,
} from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Project,
  INITIAL_PROJECTS,
  getProjects,
  saveProject,
  deleteProject,
  toggleFeaturedProject,
  seedInitialProjectsToFirestore,
} from "@/services/projectService";
import {
  MemoryItem,
  getMemories,
  saveMemory,
  deleteMemory,
  MEMORY_CATEGORIES,
} from "@/services/beyondCodeService";
import {
  CertificationItem,
  CERTIFICATION_CATEGORIES,
  categoryStyles as certCategoryStyles,
  getCertifications,
  saveCertification,
  deleteCertification,
  seedInitialCertificationsToFirestore,
} from "@/services/certificationService";
import {
  SocialLinkItem,
  SUPPORTED_PLATFORMS,
  detectPlatform,
  getSocialLinks,
  saveSocialLink,
  deleteSocialLink,
  toggleSocialLink,
  seedInitialSocialLinksToFirestore,
} from "@/services/socialMediaService";
import { categoryBadgeColorMap } from "./BeyondTheCode";
import { uploadToCloudinary } from "@/services/cloudinaryService";
import { badgeColorMap } from "@/components/portfolio/ProjectsSection";
import { ImageCropperModal } from "@/components/portfolio/ImageCropperModal";

const DEFAULT_PIN = "1234";

type AdminTab =
  | "projects"
  | "new_project"
  | "memories"
  | "new_memory"
  | "certifications"
  | "new_certification"
  | "social_links"
  | "new_social_link"
  | "list"
  | "form";

const Admin = () => {
  const navigate = useNavigate();

  // Firebase Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Tabs: "projects" | "new_project" | "memories" | "new_memory"
  const [activeTab, setActiveTab] = useState<AdminTab>("projects");

  // Projects list & loading
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Memories list & loading
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [isLoadingMemories, setIsLoadingMemories] = useState(true);

  // Certifications list & loading
  const [certifications, setCertifications] = useState<CertificationItem[]>([]);
  const [isLoadingCerts, setIsLoadingCerts] = useState(true);
  const [certSearchQuery, setCertSearchQuery] = useState("");
  const [certCategoryFilter, setCertCategoryFilter] = useState("All");

  // Certification Form state
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [certName, setCertName] = useState("");
  const [certIssuer, setCertIssuer] = useState("");
  const [certDate, setCertDate] = useState("");
  const [certCategory, setCertCategory] = useState<string>("Cloud & AI");
  const [certLink, setCertLink] = useState("");

  // Social Links list & loading
  const [socialLinks, setSocialLinks] = useState<SocialLinkItem[]>([]);
  const [isLoadingSocial, setIsLoadingSocial] = useState(true);

  // Social Link Form state
  const [editingSocialId, setEditingSocialId] = useState<string | null>(null);
  const [socialName, setSocialName] = useState("");
  const [socialUrl, setSocialUrl] = useState("");
  const [socialPlatform, setSocialPlatform] = useState<string>("auto");
  const [socialEnabled, setSocialEnabled] = useState(true);

  // Memory Form state
  const [editingMemoryId, setEditingMemoryId] = useState<string | null>(null);
  const [memoryTitle, setMemoryTitle] = useState("");
  const [memoryCategory, setMemoryCategory] = useState<string>("Life & Travel");
  const [memoryImage, setMemoryImage] = useState("");
  const [memoryLocation, setMemoryLocation] = useState("");
  const [memoryDate, setMemoryDate] = useState("");
  const [memoryDescription, setMemoryDescription] = useState("");
  const [memoryObjectPosition, setMemoryObjectPosition] = useState<string>("top");
  const [memoryObjectFit, setMemoryObjectFit] = useState<"cover" | "contain">("cover");
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [cropTargetImage, setCropTargetImage] = useState<string>("");
  const [isMemoryUploading, setIsMemoryUploading] = useState(false);
  const [memoryUploadProgress, setMemoryUploadProgress] = useState(0);

  // Project Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [badge, setBadge] = useState("Full Stack Project");
  const [badgeColor, setBadgeColor] = useState("purple");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [techStackInput, setTechStackInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [featuresList, setFeaturesList] = useState<string[]>([]);
  const [codeUrl, setCodeUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [liveLabel, setLiveLabel] = useState("Live Demo");
  const [featured, setFeatured] = useState(false);

  // Cloudinary upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Subscribe to Firebase Auth state
  useEffect(() => {
    const unsubscribe = subscribeToAuthState((user) => {
      setCurrentUser(user);
      setIsAuthenticated(!!user);
      setIsCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  // Load projects
  const refreshProjects = async () => {
    setIsLoading(true);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.warn("Failed to load projects:", err);
      toast.error("Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  };

  // Load memories (Beyond the Code)
  const refreshMemories = async () => {
    setIsLoadingMemories(true);
    try {
      const data = await getMemories();
      setMemories(data);
    } catch (err) {
      console.warn("Failed to load memories:", err);
      toast.error("Failed to load memories");
    } finally {
      setIsLoadingMemories(false);
    }
  };

  // Load certifications
  const refreshCertifications = async () => {
    setIsLoadingCerts(true);
    try {
      const data = await getCertifications();
      setCertifications(data);
    } catch (err) {
      console.warn("Failed to load certifications:", err);
      toast.error("Failed to load certifications");
    } finally {
      setIsLoadingCerts(false);
    }
  };

  // Load social links
  const refreshSocialLinks = async () => {
    setIsLoadingSocial(true);
    try {
      const data = await getSocialLinks();
      setSocialLinks(data);
    } catch (err) {
      console.warn("Failed to load social links:", err);
      toast.error("Failed to load social links");
    } finally {
      setIsLoadingSocial(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshProjects();
      refreshMemories();
      refreshCertifications();
      refreshSocialLinks();
    }
  }, [isAuthenticated]);

  // Reset Certificate form
  const resetCertForm = () => {
    setEditingCertId(null);
    setCertName("");
    setCertIssuer("");
    setCertDate("");
    setCertCategory("Cloud & AI");
    setCertLink("");
  };

  const handleEditCert = (cert: CertificationItem) => {
    setEditingCertId(cert.id);
    setCertName(cert.name);
    setCertIssuer(cert.issuer);
    setCertDate(cert.date);
    setCertCategory(cert.category);
    setCertLink(cert.link);
    setActiveTab("new_certification");
  };

  const handleDeleteCert = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete certificate: "${name}"?`)) {
      try {
        await deleteCertification(id);
        toast.success("Certificate deleted successfully!");
        refreshCertifications();
      } catch (err: any) {
        toast.error(err?.message || "Failed to delete certificate");
      }
    }
  };

  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certName.trim()) {
      toast.error("Please enter the certification title");
      return;
    }
    if (!certIssuer.trim()) {
      toast.error("Please enter the issuer / organization");
      return;
    }
    if (!certLink.trim()) {
      toast.error("Please provide the certificate verification / preview link");
      return;
    }

    const id = editingCertId || `cert-${Date.now()}`;
    const item: CertificationItem = {
      id,
      name: certName.trim(),
      issuer: certIssuer.trim(),
      date: certDate.trim() || new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      category: certCategory,
      link: certLink.trim(),
      order: editingCertId
        ? certifications.find((c) => c.id === editingCertId)?.order || 1
        : certifications.length + 1,
    };

    try {
      await saveCertification(item);
      toast.success(editingCertId ? "Certificate updated!" : "Certificate added to Firebase!");
      resetCertForm();
      await refreshCertifications();
      setActiveTab("certifications");
    } catch (err: any) {
      toast.error(err?.message || "Failed to save certification");
    }
  };

  const handleSeedCertifications = async () => {
    if (
      window.confirm(
        "Sync initial 30 certificates (Oracle, Microsoft, AWS, Cisco, etc.) to Firebase Firestore?"
      )
    ) {
      try {
        const count = await seedInitialCertificationsToFirestore();
        toast.success(`Successfully seeded ${count} certificates to Firestore! 🚀`);
        refreshCertifications();
      } catch (err: any) {
        toast.error(err.message || "Failed to seed certifications");
      }
    }
  };

  // Reset Social form
  const resetSocialForm = () => {
    setEditingSocialId(null);
    setSocialName("");
    setSocialUrl("");
    setSocialPlatform("auto");
    setSocialEnabled(true);
  };

  const handleEditSocial = (link: SocialLinkItem) => {
    setEditingSocialId(link.id);
    setSocialName(link.name);
    setSocialUrl(link.url);
    setSocialPlatform(link.platform || "auto");
    setSocialEnabled(link.enabled !== false);
    setActiveTab("new_social_link");
  };

  const handleDeleteSocial = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete social link: "${name}"?`)) {
      try {
        await deleteSocialLink(id);
        toast.success("Social link deleted successfully!");
        refreshSocialLinks();
      } catch (err: any) {
        toast.error(err?.message || "Failed to delete social link");
      }
    }
  };

  const handleToggleSocial = async (id: string, currentStatus: boolean) => {
    try {
      await toggleSocialLink(id, !currentStatus);
      toast.success(!currentStatus ? "Link shown in footer!" : "Link hidden from footer");
      refreshSocialLinks();
    } catch (err: any) {
      toast.error(err?.message || "Failed to update status");
    }
  };

  const handleSaveSocial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!socialName.trim()) {
      toast.error("Please enter a platform name (e.g. GitHub, LinkedIn, X)");
      return;
    }
    if (!socialUrl.trim()) {
      toast.error("Please enter the profile / page link URL");
      return;
    }

    const resolvedPlatform =
      socialPlatform === "auto"
        ? detectPlatform(socialName.trim(), socialUrl.trim())
        : socialPlatform;

    const id = editingSocialId || `social-${Date.now()}`;
    const item: SocialLinkItem = {
      id,
      name: socialName.trim(),
      url: socialUrl.trim(),
      platform: resolvedPlatform,
      enabled: socialEnabled,
      order: editingSocialId
        ? socialLinks.find((l) => l.id === editingSocialId)?.order || 1
        : socialLinks.length + 1,
    };

    try {
      await saveSocialLink(item);
      toast.success(editingSocialId ? "Social link updated!" : "Social link added to footer!");
      resetSocialForm();
      await refreshSocialLinks();
      setActiveTab("social_links");
    } catch (err: any) {
      toast.error(err?.message || "Failed to save social link");
    }
  };

  const handleSeedSocialLinks = async () => {
    if (
      window.confirm(
        "Sync default social profiles (GitHub, LinkedIn, Email, Instagram, YouTube, Facebook) to Firebase Firestore?"
      )
    ) {
      try {
        const count = await seedInitialSocialLinksToFirestore();
        toast.success(`Successfully synced ${count} social profiles to Firestore! 🌐`);
        refreshSocialLinks();
      } catch (err: any) {
        toast.error(err?.message || "Failed to seed social links");
      }
    }
  };

  const getSocialPlatformIcon = (platform?: string) => {
    const p = (platform || "").toLowerCase();
    if (p === "github") return <Github className="w-4 h-4 text-[#f0f6fc]" />;
    if (p === "linkedin") return <Linkedin className="w-4 h-4 text-[#0077B5]" />;
    if (p === "mail") return <Mail className="w-4 h-4 text-[#ea4335]" />;
    if (p === "instagram") return <Instagram className="w-4 h-4 text-[#E4405F]" />;
    if (p === "youtube") return <Youtube className="w-4 h-4 text-[#FF0000]" />;
    if (p === "facebook") return <Facebook className="w-4 h-4 text-[#1877F2]" />;
    if (p === "twitter") return <Twitter className="w-4 h-4 text-[#1DA1F2]" />;
    if (p === "leetcode") return <Code2 className="w-4 h-4 text-[#FFA116]" />;
    if (p === "whatsapp") return <MessageCircle className="w-4 h-4 text-[#25D366]" />;
    if (p === "telegram") return <Send className="w-4 h-4 text-[#229ED9]" />;
    return <Globe className="w-4 h-4 text-emerald-400" />;
  };

  // Reset Memory form
  const resetMemoryForm = () => {
    setEditingMemoryId(null);
    setMemoryTitle("");
    setMemoryCategory("Life & Travel");
    setMemoryImage("");
    setMemoryLocation("");
    setMemoryDate("");
    setMemoryDescription("");
    setMemoryObjectPosition("top");
    setMemoryObjectFit("cover");
    setIsCropperOpen(false);
    setCropTargetImage("");
    setMemoryUploadProgress(0);
    setIsMemoryUploading(false);
  };

  // Cloudinary image upload for memory (with FileReader fallback and automatic crop launch)
  const handleMemoryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG, WEBP, etc.)");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setCropTargetImage(reader.result);
        setIsCropperOpen(true);
        toast.info("Opening photo cropping & framing tool...");
      }
    };
    reader.readAsDataURL(file);
  };

  // Called when cropping is applied in the ImageCropperModal
  const handleCropSaved = async ({ file, dataUrl }: { file: File; blob: Blob; dataUrl: string }) => {
    setIsMemoryUploading(true);
    setMemoryUploadProgress(25);

    try {
      const result = await uploadToCloudinary(file, (progress) => {
        setMemoryUploadProgress(progress);
      });
      setMemoryImage(result.secure_url);
      toast.success("Cropped photo uploaded to Cloudinary!");
    } catch (err: any) {
      console.warn("Cloudinary upload failed, using high-res cropped data URL fallback:", err);
      setMemoryImage(dataUrl);
      toast.success("Cropped photo ready!");
    } finally {
      setIsMemoryUploading(false);
    }
  };

  // Save / Update memory
  const handleSaveMemory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!memoryTitle.trim()) {
      toast.error("Please enter a title / caption for this moment");
      return;
    }

    if (!memoryImage.trim()) {
      toast.error("Please upload a photo for this moment");
      return;
    }

    const id = editingMemoryId || `memory-${Date.now()}`;
    const memoryItem: MemoryItem = {
      id,
      title: memoryTitle.trim(),
      category: memoryCategory || "Life & Travel",
      image: memoryImage.trim(),
      objectPosition: memoryObjectPosition || "top",
      objectFit: memoryObjectFit || "cover",
      order: editingMemoryId
        ? memories.find((m) => m.id === editingMemoryId)?.order || 1
        : memories.length + 1,
    };

    if (memoryLocation.trim()) {
      memoryItem.location = memoryLocation.trim();
    }
    if (memoryDate.trim()) {
      memoryItem.date = memoryDate.trim();
    }
    if (memoryDescription.trim()) {
      memoryItem.description = memoryDescription.trim();
    }

    try {
      await saveMemory(memoryItem);
      toast.success(editingMemoryId ? "Memory updated successfully!" : "Memory saved to Firebase!");
      resetMemoryForm();
      await refreshMemories();
      setActiveTab("memories");
    } catch (err: any) {
      console.error("Failed to save memory:", err);
      toast.error(err?.message || "Failed to save memory");
    }
  };

  // Edit memory
  const handleEditMemory = (item: MemoryItem) => {
    setEditingMemoryId(item.id);
    setMemoryTitle(item.title);
    setMemoryCategory(item.category || "Life & Travel");
    setMemoryImage(item.image);
    setMemoryLocation(item.location || "");
    setMemoryDate(item.date || "");
    setMemoryDescription(item.description || "");
    setMemoryObjectPosition(item.objectPosition || "top");
    setMemoryObjectFit(item.objectFit || "cover");
    setActiveTab("new_memory");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete memory
  const handleDeleteMemory = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await deleteMemory(id);
      toast.success(`Deleted "${title}"`);
      await refreshMemories();
    } catch (err) {
      console.error("Failed to delete memory:", err);
      toast.error("Failed to delete memory");
    }
  };

  // Handle Firebase Login
  const handleFirebaseLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) {
      setLoginError("Please enter your admin email");
      return;
    }
    if (!passwordInput) {
      setLoginError("Please enter your password");
      return;
    }

    setIsLoggingIn(true);
    setLoginError(null);
    try {
      const user = await loginAdminWithEmail(emailInput, passwordInput);
      toast.success(`Welcome back, ${user.email || "Manish"}! 🚀`);
      setPasswordInput("");
    } catch (err: any) {
      const msg = getAuthErrorMessage(err?.code || "");
      setLoginError(msg);
      toast.error(msg);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      setIsAuthenticated(false);
      setCurrentUser(null);
      setPasswordInput("");
      toast.info("Logged out of Admin Panel");
    } catch (err: any) {
      toast.error("Failed to log out");
    }
  };

  // Reset form
  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSubtitle("");
    setBadge("Full Stack Project");
    setBadgeColor("purple");
    setImage("");
    setDescription("");
    setTagsInput("");
    setTechStackInput("");
    setFeatureInput("");
    setFeaturesList([]);
    setCodeUrl("");
    setLiveUrl("");
    setLiveLabel("Live Demo");
    setFeatured(false);
  };

  // Start editing a project
  const handleStartEdit = (proj: Project) => {
    setEditingId(proj.id);
    setTitle(proj.title || "");
    setSubtitle(proj.subtitle || "");
    setBadge(proj.badge || "Full Stack Project");
    setBadgeColor(proj.badgeColor || "purple");
    setImage(proj.image || "");
    setDescription(proj.description || "");
    setTagsInput(proj.tags ? proj.tags.join(", ") : "");
    setTechStackInput(proj.techStack ? proj.techStack.join(", ") : "");
    setFeaturesList(proj.features || []);
    setCodeUrl(proj.codeUrl || "");
    setLiveUrl(proj.liveUrl || "");
    setLiveLabel(proj.liveLabel || "Live Demo");
    setFeatured(!!proj.featured);
    setActiveTab("form");
  };

  // Cloudinary File Upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const result = await uploadToCloudinary(file, (percent) => {
        setUploadProgress(percent);
      });
      setImage(result.secure_url);
      toast.success("Photo uploaded to Cloudinary successfully! ☁️");
    } catch (err: any) {
      toast.error(err?.message || "Upload failed. Please check Cloudinary settings.");
    } finally {
      setIsUploading(false);
    }
  };

  // Add a feature bullet
  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFeaturesList([...featuresList, featureInput.trim()]);
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (idx: number) => {
    setFeaturesList(featuresList.filter((_, i) => i !== idx));
  };

  // Save Project
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Project title is required");
      return;
    }

    if (!image.trim()) {
      toast.error("Please upload an image via Cloudinary or paste an image URL");
      return;
    }

    const tagsArray = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const techArray = techStackInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const projectData: Project = {
      id: editingId || "",
      title: title.trim(),
      subtitle: subtitle.trim(),
      badge: badge.trim(),
      badgeColor,
      image: image.trim(),
      description: description.trim(),
      tags: tagsArray.length > 0 ? tagsArray : [badge],
      techStack: techArray.length > 0 ? techArray : ["React", "TypeScript"],
      features: featuresList,
      codeUrl: codeUrl.trim(),
      liveUrl: liveUrl.trim(),
      liveLabel: liveLabel.trim() || "Live Demo",
      featured,
    };

    try {
      await saveProject(projectData);
      toast.success(
        editingId
          ? "Project updated successfully in Firebase! ✅"
          : "New project saved to Firebase successfully! 🚀"
      );
      resetForm();
      setActiveTab("list");
      refreshProjects();
    } catch (err: any) {
      toast.error("Failed to save project: " + err.message);
    }
  };

  // Delete project
  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteProject(id);
        toast.success("Project deleted successfully");
        refreshProjects();
      } catch (err: any) {
        toast.error("Failed to delete project");
      }
    }
  };

  // Toggle Featured
  const handleToggleFeatured = async (id: string) => {
    try {
      const newVal = await toggleFeaturedProject(id);
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, featured: newVal } : p))
      );
      toast.success(newVal ? "Project featured on Home!" : "Project unfeatured from Home");
    } catch (err) {
      toast.error("Failed to update featured status");
    }
  };


  // Seed initial projects
  const handleSeedProjects = async () => {
    if (
      window.confirm(
        "Sync initial 5 projects (Pharmacare, Truesight, Essenza, etc.) to Firebase Firestore?"
      )
    ) {
      try {
        const count = await seedInitialProjectsToFirestore();
        toast.success(`Successfully seeded ${count} projects to Firestore! 🚀`);
        refreshProjects();
      } catch (err: any) {
        toast.error(err.message || "Failed to seed Firestore");
      }
    }
  };

  // Loading check
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#0b0c10] text-foreground flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="text-xs text-slate-400">Verifying Admin Session...</p>
        </div>
      </div>
    );
  }

  // ===================== FIREBASE AUTH SCREEN =====================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0b0c10] text-foreground flex items-center justify-center p-4">
        <Helmet>
          <title>Admin Login | Manish Portfolio</title>
        </Helmet>

        <div className="w-full max-w-md p-8 rounded-3xl bg-black/60 border border-white/15 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-4 shadow-glow">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Authentication</h1>
            <p className="text-xs text-slate-400 mt-1">
              Sign in with your verified Firebase Administrator account.
            </p>
          </div>

          {loginError && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleFirebaseLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="email"
                  placeholder="Enter your admin email"
                  autoComplete="username"
                  value={emailInput}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    setLoginError(null);
                  }}
                  className="pl-10 bg-white/5 border-white/15 text-white text-xs py-5 rounded-xl font-mono focus:border-primary"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your admin password"
                  autoComplete="current-password"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setLoginError(null);
                  }}
                  className="pl-10 pr-10 bg-white/5 border-white/15 text-white text-xs py-5 rounded-xl focus:border-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-6 rounded-xl font-semibold bg-gradient-to-r from-primary to-accent text-white shadow-glow hover:opacity-90 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Sign In to Dashboard
                </>
              )}
            </Button>

            <div className="text-center pt-2">
              <Link
                to="/"
                className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Portfolio
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ===================== ADMIN DASHBOARD =====================
  const featuredCount = projects.filter((p) => p.featured !== false).length;

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-foreground flex flex-col">
      <Helmet>
        <title>Admin Dashboard | Manish Portfolio</title>
      </Helmet>

      {/* Top Header */}
      <header className="sticky top-0 z-30 w-full backdrop-blur-xl bg-black/70 border-b border-white/10 px-4 sm:px-8 py-3.5">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xl font-black text-gradient">
              Manish
            </Link>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 font-semibold uppercase tracking-wider">
              Admin
            </span>
            {currentUser?.email && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {currentUser.email}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/projects"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20 transition-all"
            >
              <Eye className="w-3.5 h-3.5" /> View Projects
            </Link>

            <Link
              to="/beyond-the-code"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20 transition-all"
            >
              <Camera className="w-3.5 h-3.5 text-rose-400" /> View Beyond Code
            </Link>

            <Link
              to="/certifications"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20 transition-all"
            >
              <Award className="w-3.5 h-3.5 text-blue-400" /> View Certifications
            </Link>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> View Portfolio
            </Link>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
            >
              <LogOut className="w-3.5 h-3.5 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="container mx-auto px-4 py-8 flex-1 max-w-6xl">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-white/10 pb-4">
          <div className="flex flex-wrap items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/10">
            <button
              type="button"
              onClick={() => setActiveTab("projects")}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "projects" || activeTab === "list"
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              All Projects ({projects.length})
            </button>

            <button
              type="button"
              onClick={() => {
                resetForm();
                setActiveTab("new_project");
              }}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "new_project" || activeTab === "form"
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Plus className="w-4 h-4" />
              {editingId ? "Edit Project" : "Add Project"}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("memories")}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "memories"
                  ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-glow"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Camera className="w-3.5 h-3.5 text-rose-300" />
              Beyond the Code ({memories.length})
            </button>

            <button
              type="button"
              onClick={() => {
                resetMemoryForm();
                setActiveTab("new_memory");
              }}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "new_memory"
                  ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-glow"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Plus className="w-4 h-4" />
              {editingMemoryId ? "Edit Memory" : "Add Photo / Memory"}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("certifications")}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "certifications"
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-glow"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Award className="w-3.5 h-3.5 text-blue-300" />
              Certifications ({certifications.length})
            </button>

            <button
              type="button"
              onClick={() => {
                resetCertForm();
                setActiveTab("new_certification");
              }}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "new_certification"
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-glow"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Plus className="w-4 h-4" />
              {editingCertId ? "Edit Certificate" : "Add Certificate"}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("social_links")}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "social_links"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-glow"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-300" />
              Social Links ({socialLinks.length})
            </button>

            <button
              type="button"
              onClick={() => {
                resetSocialForm();
                setActiveTab("new_social_link");
              }}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "new_social_link"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-glow"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Plus className="w-4 h-4" />
              {editingSocialId ? "Edit Social Link" : "Add Social Link"}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Home Featured: <strong>{featuredCount}</strong> (Top 3 Shown)
            </span>
          </div>
        </div>

        {/* TAB 1: PROJECTS LIST */}
        {(activeTab === "list" || activeTab === "projects") && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Managed Projects</h2>
                <p className="text-xs text-slate-400">
                  Toggle "Featured" to choose which 3 projects appear on the main page.
                </p>
              </div>

              <Button
                size="sm"
                onClick={() => {
                  resetForm();
                  setActiveTab("form");
                }}
                className="bg-primary hover:bg-primary/90 text-white rounded-xl text-xs"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> New Project
              </Button>
            </div>

            {isLoading ? (
              <div className="py-20 text-center text-slate-400">Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="p-12 text-center border border-white/10 rounded-2xl bg-white/5">
                <FolderPlus className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white">No projects found</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Click the button below to seed initial portfolio projects or add a new project.
                </p>
                <div className="mt-4 flex justify-center gap-3">
                  <Button onClick={handleSeedProjects} size="sm" variant="outline">
                    Seed 5 Initial Projects
                  </Button>
                  <Button onClick={() => setActiveTab("form")} size="sm">
                    Add First Project
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-white/10">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-white text-base truncate">
                            {proj.title}
                          </h4>
                          {proj.badge && (
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                                badgeColorMap[proj.badgeColor || "purple"]
                              }`}
                            >
                              {proj.badge}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-400 mt-0.5 truncate">
                          {proj.subtitle}
                        </p>

                        <div className="flex flex-wrap gap-1 mt-2">
                          {proj.techStack?.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="text-[10px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-slate-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      {/* Featured toggle */}
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                        <Switch
                          checked={!!proj.featured}
                          onCheckedChange={() => handleToggleFeatured(proj.id)}
                        />
                        <span className={proj.featured ? "text-amber-400 font-semibold" : ""}>
                          {proj.featured ? "Featured on Home" : "Standard"}
                        </span>
                      </label>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleStartEdit(proj)}
                          className="h-8 px-2.5 text-xs text-slate-300 hover:text-white"
                        >
                          <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(proj.id, proj.title)}
                          className="h-8 px-2.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                        >
                          <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ADD / EDIT PROJECT FORM */}
        {(activeTab === "form" || activeTab === "new_project") && (
          <div className="max-w-3xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {editingId ? "Edit Project" : "Add New Project"}
                </h2>
                <p className="text-xs text-slate-400">
                  Photos are uploaded to Cloudinary, and metadata & description are saved to Firebase Firestore.
                </p>
              </div>

              {editingId && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={resetForm}
                  className="text-xs border-white/20"
                >
                  Cancel Edit
                </Button>
              )}
            </div>

            <form onSubmit={handleSaveProject} className="space-y-6">
              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Project Title *
                  </label>
                  <Input
                    required
                    placeholder="e.g. PHARMACARE (MEDISTOCK)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-white/5 border-white/15 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Subtitle / Category Tagline
                  </label>
                  <Input
                    placeholder="e.g. Inventory & Billing System"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="bg-white/5 border-white/15 text-white"
                  />
                </div>
              </div>

              {/* Badge & Color */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Badge Label
                  </label>
                  <Input
                    placeholder="e.g. Full Stack Project, LIVE – Client Project"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="bg-white/5 border-white/15 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Badge Color Theme
                  </label>
                  <select
                    value={badgeColor}
                    onChange={(e) => setBadgeColor(e.target.value)}
                    className="w-full py-2 px-3 rounded-md bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="purple" className="bg-slate-900">Purple</option>
                    <option value="green" className="bg-slate-900">Green / Emerald</option>
                    <option value="orange" className="bg-slate-900">Orange / Amber</option>
                    <option value="blue" className="bg-slate-900">Blue</option>
                    <option value="cyan" className="bg-slate-900">Cyan</option>
                    <option value="rose" className="bg-slate-900">Rose / Red</option>
                  </select>
                </div>
              </div>

              {/* Cloudinary Image Upload Section */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/15 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-primary" /> Project Photo (Cloudinary Upload) *
                  </label>
                  <span className="text-[11px] text-slate-400">
                    Stores directly on Cloudinary & links in Firebase
                  </span>
                </div>

                {/* File picker for Cloudinary */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <label className="relative flex-1 w-full border-2 border-dashed border-white/20 hover:border-primary/60 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-white/[0.02]">
                    <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                    <span className="text-xs font-medium text-slate-300">
                      Click to upload image to Cloudinary
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5">
                      PNG, JPG, WebP up to 10MB
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>

                  {/* Or direct image URL */}
                  <div className="w-full sm:w-1/2 space-y-2">
                    <label className="text-[11px] text-slate-400">
                      Or paste Cloudinary/Image URL directly:
                    </label>
                    <Input
                      placeholder="https://res.cloudinary.com/..."
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="bg-white/5 border-white/15 text-white text-xs"
                    />
                  </div>
                </div>

                {/* Progress bar */}
                {isUploading && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Uploading to Cloudinary...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-200"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Preview */}
                {image && (
                  <div className="flex items-center gap-3 pt-2">
                    <img
                      src={image}
                      alt="Preview"
                      className="w-20 h-14 object-cover rounded-lg border border-white/20"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Photo URL Ready
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">{image}</p>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => setImage("")}
                      className="text-xs text-rose-400 hover:text-rose-300"
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>

              {/* Description (Stored in Firebase Firestore) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Project Description * (Saved in Firebase Database)</span>
                  <span className="text-[10px] text-slate-500 font-normal">
                    Comprehensive overview & business impact
                  </span>
                </label>
                <Textarea
                  required
                  rows={4}
                  placeholder="Describe what you built, architecture, features, and challenges solved..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-white/5 border-white/15 text-white text-sm"
                />
              </div>

              {/* Tags & Tech Stack */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Tags (Comma-separated)
                  </label>
                  <Input
                    placeholder="Full Stack, SaaS Dashboard, AI / ML"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="bg-white/5 border-white/15 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Tech Stack (Comma-separated)
                  </label>
                  <Input
                    placeholder="React, TypeScript, Supabase, PostgreSQL, Tailwind"
                    value={techStackInput}
                    onChange={(e) => setTechStackInput(e.target.value)}
                    className="bg-white/5 border-white/15 text-white"
                  />
                </div>
              </div>

              {/* Key Features Bullet list */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-300">
                  Key Features / Highlights
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a key feature bullet point..."
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                    className="bg-white/5 border-white/15 text-white text-sm"
                  />
                  <Button
                    type="button"
                    onClick={handleAddFeature}
                    className="shrink-0 bg-white/10 hover:bg-white/20 text-white"
                  >
                    Add
                  </Button>
                </div>

                {featuresList.length > 0 && (
                  <ul className="space-y-1.5 pt-1">
                    {featuresList.map((feat, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between text-xs bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-lg text-slate-200"
                      >
                        <span className="truncate pr-2">• {feat}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(idx)}
                          className="text-slate-400 hover:text-rose-400"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* URLs & Links */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    GitHub Code URL
                  </label>
                  <Input
                    placeholder="https://github.com/Manishyadav2005/..."
                    value={codeUrl}
                    onChange={(e) => setCodeUrl(e.target.value)}
                    className="bg-white/5 border-white/15 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Live Demo / Website URL
                  </label>
                  <Input
                    placeholder="https://..."
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    className="bg-white/5 border-white/15 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Live Button Label
                  </label>
                  <Input
                    placeholder="Live Demo, Live Website"
                    value={liveLabel}
                    onChange={(e) => setLiveLabel(e.target.value)}
                    className="bg-white/5 border-white/15 text-white text-xs"
                  />
                </div>
              </div>

              {/* Featured toggle */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Show as Featured Project on Main Page
                  </h4>
                  <p className="text-xs text-slate-400">
                    The homepage displays the top 3 featured projects.
                  </p>
                </div>
                <Switch
                  checked={featured}
                  onCheckedChange={setFeatured}
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setActiveTab("projects")}
                  className="text-slate-400 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-primary to-accent text-white font-semibold px-8 shadow-glow"
                >
                  {editingId ? "Update Project" : "Save Project to Firebase"}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: BEYOND THE CODE MEMORIES LIST */}
        {activeTab === "memories" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Camera className="w-5 h-5 text-rose-400" />
                  Beyond the Code Moments ({memories.length})
                </h2>
                <p className="text-xs text-slate-400">
                  Photos and memories displayed on the "/beyond-the-code" gallery page.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/beyond-the-code"
                  target="_blank"
                  className="text-xs px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white inline-flex items-center gap-1.5 transition-all hover:border-white/25"
                >
                  <Eye className="w-3.5 h-3.5" /> View Live Page
                </Link>

                <Button
                  size="sm"
                  onClick={() => {
                    resetMemoryForm();
                    setActiveTab("new_memory");
                  }}
                  className="bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-glow text-xs"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Photo / Memory
                </Button>
              </div>
            </div>

            {isLoadingMemories ? (
              <div className="text-center py-16 text-slate-400">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
                Loading moments...
              </div>
            ) : memories.length === 0 ? (
              <div className="text-center py-16 bg-white/[0.02] border border-white/10 rounded-2xl p-8">
                <Camera className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white mb-1">No moments uploaded yet</h3>
                <p className="text-xs text-slate-400 mb-4 max-w-sm mx-auto">
                  Upload photos, travel memories, hackathons, or campus memories to showcase on your portfolio.
                </p>
                <Button
                  onClick={() => {
                    resetMemoryForm();
                    setActiveTab("new_memory");
                  }}
                  className="bg-primary text-white"
                >
                  <Plus className="w-4 h-4 mr-1.5" /> Upload First Photo
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {memories.map((item) => (
                  <div
                    key={item.id}
                    className="group relative rounded-2xl overflow-hidden bg-black/40 border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Thumbnail */}
                      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          style={{
                            objectFit: item.objectFit || "cover",
                            objectPosition:
                              item.objectPosition === "center"
                                ? "center"
                                : item.objectPosition === "bottom"
                                ? "bottom"
                                : "center top",
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <span
                          className={`absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-md ${
                            categoryBadgeColorMap[item.category] || categoryBadgeColorMap["Other"]
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 mb-1.5">
                          {item.date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-primary" /> {item.date}
                            </span>
                          )}
                          {item.location && (
                            <span className="flex items-center gap-1 text-rose-400">
                              <MapPin className="w-3 h-3" /> {item.location}
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-white mb-1.5 line-clamp-1">
                          {item.title}
                        </h3>

                        {item.description && (
                          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-4 pt-0 border-t border-white/5 mt-3 flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditMemory(item)}
                        className="h-8 px-2.5 text-xs text-slate-300 hover:text-white hover:bg-white/10"
                      >
                        <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteMemory(item.id, item.title)}
                        className="h-8 px-2.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: ADD / EDIT MEMORY FORM */}
        {activeTab === "new_memory" && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Camera className="w-5 h-5 text-rose-400" />
                  {editingMemoryId ? "Edit Memory / Photo" : "Add Photo to Beyond the Code"}
                </h2>
                <p className="text-xs text-slate-400">
                  Upload photos, travel memories, or hackathon experiences with Cloudinary & Firebase.
                </p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  resetMemoryForm();
                  setActiveTab("memories");
                }}
                className="text-xs text-slate-300 hover:text-white"
              >
                Back to Memories
              </Button>
            </div>

            <form onSubmit={handleSaveMemory} className="space-y-6">
              {/* Photo Upload with Cloudinary & Live Cropping */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
                  <span>Photo / Image *</span>
                  {isMemoryUploading && (
                    <span className="text-xs text-primary flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Uploading to Cloudinary ({memoryUploadProgress}%)...
                    </span>
                  )}
                </label>

                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <label className="relative flex flex-col items-center justify-center w-full sm:w-64 h-52 rounded-2xl border-2 border-dashed border-white/20 hover:border-primary/50 bg-white/[0.02] hover:bg-white/[0.04] transition-all cursor-pointer overflow-hidden group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMemoryImageUpload}
                      disabled={isMemoryUploading}
                      className="sr-only"
                    />

                    {memoryImage ? (
                      <div className="relative w-full h-full">
                        <img
                          src={memoryImage}
                          alt="Preview"
                          className="w-full h-full"
                          style={{
                            objectFit: memoryObjectFit || "cover",
                            objectPosition:
                              memoryObjectPosition === "center"
                                ? "center"
                                : memoryObjectPosition === "bottom"
                                ? "bottom"
                                : "center top",
                          }}
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 text-xs text-white font-medium p-2 text-center">
                          <UploadCloud className="w-5 h-5 text-primary" />
                          <span>Click to Change Photo</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4 text-center">
                        <UploadCloud className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-semibold text-white mb-1">
                          Upload from Computer
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Auto-opens crop & framing tool
                        </span>
                      </div>
                    )}
                  </label>

                  <div className="flex-1 w-full space-y-3">
                    <div className="space-y-1.5">
                      <span className="text-xs text-slate-400">
                        Or paste an image URL:
                      </span>
                      <Input
                        type="url"
                        placeholder="https://res.cloudinary.com/... or https://..."
                        value={memoryImage}
                        onChange={(e) => setMemoryImage(e.target.value)}
                        className="bg-white/5 border-white/10 text-white text-xs"
                      />
                    </div>

                    {/* Crop & Reframe Trigger Button */}
                    {memoryImage && (
                      <div className="flex flex-wrap items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setCropTargetImage(memoryImage);
                            setIsCropperOpen(true);
                          }}
                          className="bg-primary/20 hover:bg-primary/30 text-primary border-primary/40 text-xs flex items-center gap-1.5 py-1.5 px-3.5 rounded-xl shadow-glow transition-all"
                        >
                          <CropIcon className="w-4 h-4" />
                          <span>✂️ Crop & Frame Photo</span>
                        </Button>
                      </div>
                    )}

                    {/* Alignment & Display Mode Controls */}
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                      <div>
                        <span className="text-[11px] font-semibold text-slate-300 block mb-1.5">
                          Gallery Card Focus (Prevents Cutoff):
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            { key: "top", label: "Face / Top Focus (Recommended)" },
                            { key: "center", label: "Center" },
                            { key: "bottom", label: "Bottom" },
                          ].map((pos) => (
                            <button
                              key={pos.key}
                              type="button"
                              onClick={() => setMemoryObjectPosition(pos.key)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                                memoryObjectPosition === pos.key
                                  ? "bg-primary text-white border-primary shadow-sm"
                                  : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
                              }`}
                            >
                              {pos.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-[11px] font-semibold text-slate-300 block mb-1.5">
                          Card Display Mode:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            { key: "cover", label: "Cover (Fill Card)" },
                            { key: "contain", label: "Contain (Show Full Image)" },
                          ].map((fit) => (
                            <button
                              key={fit.key}
                              type="button"
                              onClick={() => setMemoryObjectFit(fit.key as any)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                                memoryObjectFit === fit.key
                                  ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                                  : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
                              }`}
                            >
                              {fit.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title / Caption */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-200">
                  Moment Title / Caption *
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Smart India Hackathon Finals or Himalayan Ridge Trek"
                  value={memoryTitle}
                  onChange={(e) => setMemoryTitle(e.target.value)}
                  className="bg-white/5 border-white/10 text-white text-sm"
                  required
                />
              </div>

              {/* Category, Location & Date Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-200">
                    Category *
                  </label>
                  <select
                    value={memoryCategory}
                    onChange={(e) => setMemoryCategory(e.target.value)}
                    className="w-full bg-[#12141c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                  >
                    {MEMORY_CATEGORIES.filter((c) => c !== "All").map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-200">
                    Location (Optional)
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. New Delhi, India"
                    value={memoryLocation}
                    onChange={(e) => setMemoryLocation(e.target.value)}
                    className="bg-white/5 border-white/10 text-white text-xs"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-200">
                    Date / Period (Optional)
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. October 2024"
                    value={memoryDate}
                    onChange={(e) => setMemoryDate(e.target.value)}
                    className="bg-white/5 border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              {/* Story / Description */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-200">
                  Story / Experience Description (Optional)
                </label>
                <Textarea
                  placeholder="Share the story, what you learned, who you were with, or why this moment was meaningful..."
                  value={memoryDescription}
                  onChange={(e) => setMemoryDescription(e.target.value)}
                  rows={4}
                  className="bg-white/5 border-white/10 text-white text-xs leading-relaxed"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    resetMemoryForm();
                    setActiveTab("memories");
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={isMemoryUploading}
                  className="bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold px-8 shadow-glow"
                >
                  {editingMemoryId ? "Update Memory" : "Save Memory to Firebase"}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 5: CERTIFICATIONS LIST */}
        {activeTab === "certifications" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-400" />
                  Managed Certifications ({certifications.length})
                </h2>
                <p className="text-xs text-slate-400">
                  Professional certifications displayed on the homepage and /certifications page.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSeedCertifications}
                  className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 text-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1" />
                  Sync 30 Initial to Firebase
                </Button>

                <Button
                  size="sm"
                  onClick={() => {
                    resetCertForm();
                    setActiveTab("new_certification");
                  }}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 text-white rounded-xl text-xs"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Add Certificate
                </Button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search by certificate title, issuer, or date..."
                  value={certSearchQuery}
                  onChange={(e) => setCertSearchQuery(e.target.value)}
                  className="bg-white/5 border-white/10 text-white text-xs pl-10"
                />
              </div>

              <select
                value={certCategoryFilter}
                onChange={(e) => setCertCategoryFilter(e.target.value)}
                className="bg-[#12141c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
              >
                {CERTIFICATION_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    Category: {cat}
                  </option>
                ))}
              </select>
            </div>

            {isLoadingCerts ? (
              <div className="py-20 text-center text-slate-400">
                Loading certifications...
              </div>
            ) : certifications.length === 0 ? (
              <div className="p-12 text-center border border-white/10 rounded-2xl bg-white/5">
                <Award className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white">
                  No certifications found
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Click below to seed the 30 initial certificates or create your own.
                </p>
                <div className="mt-4 flex justify-center gap-3">
                  <Button
                    onClick={handleSeedCertifications}
                    size="sm"
                    variant="outline"
                  >
                    Sync 30 Default Certifications
                  </Button>
                  <Button
                    onClick={() => {
                      resetCertForm();
                      setActiveTab("new_certification");
                    }}
                    size="sm"
                  >
                    Add Certificate
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications
                  .filter((cert) => {
                    const matchCategory =
                      certCategoryFilter === "All" ||
                      cert.category === certCategoryFilter;
                    const q = certSearchQuery.toLowerCase().trim();
                    const matchQuery =
                      !q ||
                      cert.name.toLowerCase().includes(q) ||
                      cert.issuer.toLowerCase().includes(q) ||
                      cert.category.toLowerCase().includes(q) ||
                      cert.date.toLowerCase().includes(q);
                    return matchCategory && matchQuery;
                  })
                  .map((cert) => {
                    const style =
                      certCategoryStyles[cert.category] ||
                      certCategoryStyles["Development"];

                    return (
                      <div
                        key={cert.id}
                        className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between gap-3 group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2.5 rounded-xl bg-black/60 border border-white/15 shrink-0">
                            <Award className={`w-5 h-5 ${style.iconColor}`} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-white text-sm line-clamp-2">
                              {cert.name}
                            </h4>
                            <p className="text-xs text-slate-300 mt-0.5 truncate">
                              {cert.issuer}
                            </p>
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/15 text-slate-300">
                                {cert.date}
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/15 text-white">
                                {cert.category}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-white/10">
                          {cert.link && cert.link !== "#" ? (
                            <a
                              href={cert.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                            >
                              <ExternalLink className="w-3.5 h-3.5" /> Preview Link
                            </a>
                          ) : (
                            <span className="text-xs text-slate-500">No URL</span>
                          )}

                          <div className="flex items-center gap-1.5">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditCert(cert)}
                              className="h-8 px-2.5 text-xs text-slate-300 hover:text-white hover:bg-white/10"
                            >
                              <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
                            </Button>

                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteCert(cert.id, cert.name)}
                              className="h-8 px-2.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* TAB 6: NEW / EDIT CERTIFICATION FORM */}
        {activeTab === "new_certification" && (
          <div className="max-w-2xl mx-auto bg-black/40 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-400" />
                  {editingCertId ? "Edit Certification" : "Add New Certification"}
                </h2>
                <p className="text-xs text-slate-400">
                  Fill in the credentials information. Changes will reflect on both the homepage and full certifications page.
                </p>
              </div>

              <Button
                size="sm"
                variant="ghost"
                onClick={() => setActiveTab("certifications")}
                className="text-slate-400 hover:text-white"
              >
                Back to List
              </Button>
            </div>

            <form onSubmit={handleSaveCert} className="space-y-5">
              {/* Title / Name */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-200">
                  Certification Title *
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Oracle Cloud Infrastructure 2025 Certified Generative AI Professional"
                  value={certName}
                  onChange={(e) => setCertName(e.target.value)}
                  className="bg-white/5 border-white/10 text-white text-sm"
                  required
                />
              </div>

              {/* Issuer & Date Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-200">
                    Issuer / Organization *
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. Oracle University, Microsoft, Cisco, Udemy"
                    value={certIssuer}
                    onChange={(e) => setCertIssuer(e.target.value)}
                    className="bg-white/5 border-white/10 text-white text-xs"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-200">
                    Issue Date / Period *
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. September 2025 or March 2025"
                    value={certDate}
                    onChange={(e) => setCertDate(e.target.value)}
                    className="bg-white/5 border-white/10 text-white text-xs"
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-200">
                  Domain / Category *
                </label>
                <select
                  value={certCategory}
                  onChange={(e) => setCertCategory(e.target.value)}
                  className="w-full bg-[#12141c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                >
                  {CERTIFICATION_CATEGORIES.filter((c) => c !== "All").map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Verification Link */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-200">
                  Verification / Google Drive Preview Link *
                </label>
                <Input
                  type="url"
                  placeholder="https://drive.google.com/file/d/.../preview or http://verify.skilljar.com/..."
                  value={certLink}
                  onChange={(e) => setCertLink(e.target.value)}
                  className="bg-white/5 border-white/10 text-white text-xs"
                  required
                />
                <p className="text-[11px] text-slate-500">
                  Tip: Use Google Drive preview links (format: /preview) or public verification URLs from Coursera, Credly, or Skilljar.
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    resetCertForm();
                    setActiveTab("certifications");
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold px-8 shadow-glow"
                >
                  {editingCertId ? "Update Certificate" : "Save Certificate to Firebase"}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 7: SOCIAL MEDIA LINKS LIST */}
        {activeTab === "social_links" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-emerald-400" />
                  Footer Social Media Links
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Manage social links displayed with animated rainbow borders in the website footer.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSeedSocialLinks}
                  className="bg-white/5 border-white/10 hover:bg-white/10 text-slate-300 text-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                  Sync Default Links
                </Button>

                <Button
                  size="sm"
                  onClick={() => {
                    resetSocialForm();
                    setActiveTab("new_social_link");
                  }}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-white rounded-xl text-xs"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Add Social Link
                </Button>
              </div>
            </div>

            {isLoadingSocial ? (
              <div className="py-20 text-center text-slate-400">
                Loading social media links...
              </div>
            ) : socialLinks.length === 0 ? (
              <div className="p-12 text-center border border-white/10 rounded-2xl bg-white/5">
                <Share2 className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white">
                  No social links found
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Seed the initial profiles (GitHub, LinkedIn, Email, Instagram, YouTube, Facebook) or create custom links.
                </p>
                <div className="mt-4 flex justify-center gap-3">
                  <Button
                    onClick={handleSeedSocialLinks}
                    size="sm"
                    variant="outline"
                  >
                    Sync Default Social Profiles
                  </Button>
                  <Button
                    onClick={() => {
                      resetSocialForm();
                      setActiveTab("new_social_link");
                    }}
                    size="sm"
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                  >
                    Add Social Link
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {socialLinks.map((link) => (
                  <div
                    key={link.id}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between gap-3 group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-black/60 border border-white/15 shrink-0 flex items-center justify-center">
                        {getSocialPlatformIcon(link.platform)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-bold text-white text-sm truncate">
                            {link.name}
                          </h4>
                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/10">
                            {link.platform || "other"}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 truncate font-mono">
                          {link.url}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      {/* Footer visibility toggle */}
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={link.enabled !== false}
                          onCheckedChange={() =>
                            handleToggleSocial(link.id, link.enabled !== false)
                          }
                          className="data-[state=checked]:bg-emerald-500"
                        />
                        <span
                          className={`text-[11px] font-medium ${
                            link.enabled !== false
                              ? "text-emerald-400"
                              : "text-slate-500"
                          }`}
                        >
                          {link.enabled !== false ? "In Footer" : "Hidden"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {link.url && (
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                            title="Visit URL"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditSocial(link)}
                          className="h-8 px-2.5 text-xs text-slate-300 hover:text-white hover:bg-white/10"
                        >
                          <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteSocial(link.id, link.name)}
                          className="h-8 px-2.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 8: ADD / EDIT SOCIAL LINK FORM */}
        {activeTab === "new_social_link" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-emerald-400" />
                  {editingSocialId ? "Edit Social Link" : "Add New Social Link"}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Add social links or communication channels to appear in the website footer.
                </p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  resetSocialForm();
                  setActiveTab("social_links");
                }}
                className="text-xs text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4 mr-1" /> Close
              </Button>
            </div>

            <form
              onSubmit={handleSaveSocial}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-5"
            >
              {/* Platform Name */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-200">
                  Platform / Channel Name *
                </label>
                <Input
                  placeholder="e.g. GitHub, LinkedIn, Instagram, LeetCode, Twitter / X..."
                  value={socialName}
                  onChange={(e) => setSocialName(e.target.value)}
                  className="bg-white/5 border-white/10 text-white text-xs"
                  required
                />
              </div>

              {/* URL */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-200">
                  Profile URL / Link *
                </label>
                <Input
                  type="text"
                  placeholder="https://github.com/... or mailto:..."
                  value={socialUrl}
                  onChange={(e) => setSocialUrl(e.target.value)}
                  className="bg-white/5 border-white/10 text-white text-xs font-mono"
                  required
                />
              </div>

              {/* Platform Icon Choice */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-200">
                  Icon / Platform Brand
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                  <select
                    value={socialPlatform}
                    onChange={(e) => setSocialPlatform(e.target.value)}
                    className="sm:col-span-2 bg-[#12141c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                  >
                    <option value="auto">Auto-detect from Name / URL</option>
                    {SUPPORTED_PLATFORMS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                  </select>

                  {/* Live Icon Preview */}
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/40 border border-white/10">
                    <div className="p-1.5 rounded-lg bg-black/60 border border-white/15">
                      {getSocialPlatformIcon(
                        socialPlatform === "auto"
                          ? detectPlatform(socialName, socialUrl)
                          : socialPlatform
                      )}
                    </div>
                    <span className="text-[11px] text-slate-300">
                      Preview Icon
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer visibility toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <h5 className="text-xs font-semibold text-white">
                    Show in Website Footer
                  </h5>
                  <p className="text-[11px] text-slate-400">
                    Turn this toggle on to display this link and icon in the bottom footer.
                  </p>
                </div>
                <Switch
                  checked={socialEnabled}
                  onCheckedChange={setSocialEnabled}
                  className="data-[state=checked]:bg-emerald-500"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    resetSocialForm();
                    setActiveTab("social_links");
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold px-8 shadow-glow"
                >
                  {editingSocialId
                    ? "Update Social Link"
                    : "Save Social Link to Footer"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Interactive Image Cropper Modal */}
      <ImageCropperModal
        isOpen={isCropperOpen}
        imageSrc={cropTargetImage}
        onClose={() => setIsCropperOpen(false)}
        onCropComplete={handleCropSaved}
      />
    </div>
  );
};

export default Admin;
