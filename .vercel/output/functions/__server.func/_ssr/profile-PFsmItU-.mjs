import { r as __toESM } from "../_runtime.mjs";
import { n as firebaseAuth } from "./firebase-BL0L6cM-.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as LoaderCircle, A as Save, Bt as Briefcase, C as Shield, Ft as Camera, Ht as BookOpen, M as Rocket, Nt as Check, R as Pen, Yt as ArrowLeft, ct as Hash, dt as Github, et as Linkedin, h as Trash2, it as Instagram, l as Users, lt as GraduationCap, ot as Image, st as Heart, u as User, ut as Globe, wt as Coffee } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./supabase-Bz5bubvX.mjs";
import { C as usePrompts, F as useUpsertPrompt, N as useUpdateProfile, P as useUploadPhoto, T as useReorderPhotos, d as useDeletePrompt, u as useDeletePhoto, v as useMyProfile, y as useMyPrompts } from "./use-dating-api-CYSx6-cH.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-PFsmItU-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function uploadDatingPhoto(userId, file, folder = "dating-photos") {
	const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
	const path = `${folder}/${userId}/${`${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`}`;
	const { error } = await supabase.storage.from("avatars").upload(path, file, {
		cacheControl: "3600",
		upsert: false
	});
	if (error) throw error;
	const { data } = supabase.storage.from("avatars").getPublicUrl(path);
	return {
		url: data.publicUrl,
		path
	};
}
var RELATIONSHIP_OPTIONS = [
	{
		value: "friends",
		label: "Friends",
		icon: Users
	},
	{
		value: "dating",
		label: "Dating",
		icon: Heart
	},
	{
		value: "study_buddy",
		label: "Study Buddy",
		icon: GraduationCap
	},
	{
		value: "networking",
		label: "Networking",
		icon: Briefcase
	},
	{
		value: "startup_partner",
		label: "Startup Partner",
		icon: Rocket
	}
];
var YEAR_OPTIONS = [
	"1st Year",
	"2nd Year",
	"3rd Year",
	"4th Year",
	"5th Year",
	"Grad Student",
	"PhD",
	"Alumni"
];
var BRANCH_OPTIONS = [
	"Computer Science",
	"Electronics",
	"Mechanical",
	"Civil",
	"Electrical",
	"Chemical",
	"Biotechnology",
	"Information Technology",
	"AI & ML",
	"Data Science",
	"Mathematics",
	"Physics",
	"Chemistry",
	"Economics",
	"Management",
	"Design",
	"Architecture"
];
var HOSTEL_OPTIONS = [
	"Hostel A",
	"Hostel B",
	"Hostel C",
	"Hostel D",
	"Hostel E",
	"Hostel F",
	"Off Campus",
	"Day Scholar"
];
function ProfileEditor() {
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = (0, import_react.useState)(null);
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const [activeSection, setActiveSection] = (0, import_react.useState)("basics");
	const [photos, setPhotos] = (0, import_react.useState)([]);
	const [photoPreviews, setPhotoPreviews] = (0, import_react.useState)([]);
	const [draggingIndex, setDraggingIndex] = (0, import_react.useState)(null);
	const { data: myProfile, isLoading: profileLoading, refetch: refetchProfile } = useMyProfile();
	const { data: allPrompts } = usePrompts();
	const { data: myPrompts = [] } = useMyPrompts();
	const updateProfile = useUpdateProfile();
	const uploadPhoto = useUploadPhoto();
	const deletePhoto = useDeletePhoto();
	const reorderPhotos = useReorderPhotos();
	const upsertPrompt = useUpsertPrompt();
	const deletePrompt = useDeletePrompt();
	(0, import_react.useEffect)(() => {
		return firebaseAuth.onAuthStateChanged((user) => {
			if (user) setCurrentUser({
				uid: user.uid,
				email: user.email,
				displayName: user.displayName,
				photoURL: user.photoURL
			});
			else {
				setCurrentUser(null);
				navigate({ to: "/login" });
			}
		});
	}, [navigate]);
	const [formData, setFormData] = (0, import_react.useState)({
		first_name: "",
		last_name: "",
		age: 20,
		year: "3rd Year",
		branch: "",
		major: "",
		hostel: "",
		bio: "",
		gender: "",
		pronouns: "",
		relationship_preference: [],
		interests: [],
		languages: [],
		clubs: [],
		societies: [],
		skills: [],
		favorite_cafe: "",
		favorite_sport: "",
		instagram_url: "",
		linkedin_url: "",
		github_url: "",
		study_subjects: [],
		study_cgpa_goal: "",
		study_preferred_time: "",
		study_preferred_location: "",
		startup_looking_for: false,
		startup_role: "",
		startup_skills: [],
		is_incognito: false,
		show_only: "all"
	});
	(0, import_react.useEffect)(() => {
		if (myProfile) setFormData({
			first_name: myProfile.first_name || "",
			last_name: myProfile.last_name || "",
			age: myProfile.age || 20,
			year: myProfile.year || "3rd Year",
			branch: myProfile.branch || "",
			major: myProfile.major || "",
			hostel: myProfile.hostel || "",
			bio: myProfile.bio || "",
			gender: myProfile.gender || "",
			pronouns: myProfile.pronouns || "",
			relationship_preference: myProfile.relationship_preference || [],
			interests: myProfile.interests || [],
			languages: myProfile.languages || [],
			clubs: myProfile.clubs || [],
			societies: myProfile.societies || [],
			skills: myProfile.skills || [],
			favorite_cafe: myProfile.favorite_cafe || "",
			favorite_sport: myProfile.favorite_sport || "",
			instagram_url: myProfile.instagram_url || "",
			linkedin_url: myProfile.linkedin_url || "",
			github_url: myProfile.github_url || "",
			study_subjects: myProfile.study_subjects || [],
			study_cgpa_goal: myProfile.study_cgpa_goal || "",
			study_preferred_time: myProfile.study_preferred_time || "",
			study_preferred_location: myProfile.study_preferred_location || "",
			startup_looking_for: myProfile.startup_looking_for || false,
			startup_role: myProfile.startup_role || "",
			startup_skills: myProfile.startup_skills || [],
			is_incognito: myProfile.is_incognito || false,
			show_only: myProfile.show_only || "all"
		});
	}, [myProfile]);
	const handleChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value
		}));
	};
	const handleArrayChange = (field, item, checked) => {
		setFormData((prev) => ({
			...prev,
			[field]: checked ? [...prev[field], item] : prev[field].filter((i) => i !== item)
		}));
	};
	const handleTagInput = (field, value) => {
		const tags = value.split(",").map((t) => t.trim()).filter(Boolean);
		setFormData((prev) => ({
			...prev,
			[field]: tags
		}));
	};
	const handlePhotoUpload = async (e) => {
		const files = Array.from(e.target.files || []);
		const remainingSlots = 3 - (myProfile?.photos?.length || 0);
		if (files.length > remainingSlots) {
			toast.error(`Maximum ${remainingSlots} more photos allowed`);
			return;
		}
		for (const file of files) {
			if (!file.type.startsWith("image/")) continue;
			const preview = URL.createObjectURL(file);
			setPhotoPreviews((prev) => [...prev, preview]);
			setPhotos((prev) => [...prev, file]);
		}
	};
	const handleSavePhotos = async () => {
		if (photos.length === 0) return;
		setIsSaving(true);
		try {
			for (let i = 0; i < photos.length; i++) {
				const file = photos[i];
				const { url, path } = await uploadDatingPhoto(currentUser?.uid || "", file);
				await uploadPhoto.mutateAsync({
					url,
					storage_path: path,
					is_main: i === 0 && !(myProfile?.photos?.length || 0),
					width: 800,
					height: 1e3,
					file_size: file.size,
					mime_type: file.type
				});
			}
			toast.success("Photos uploaded!");
			setPhotos([]);
			setPhotoPreviews([]);
			refetchProfile();
		} catch (error) {
			console.error("Upload error:", error);
			toast.error("Failed to upload photos");
		} finally {
			setIsSaving(false);
		}
	};
	const handleRemovePhoto = async (photoId) => {
		try {
			await deletePhoto.mutateAsync(String(photoId));
			toast.success("Photo removed");
			refetchProfile();
		} catch {
			toast.error("Failed to remove photo");
		}
	};
	const handleReorderPhotos = async (newOrder) => {
		try {
			const photoOrders = newOrder.map((id, index) => ({
				id,
				display_order: index
			}));
			await reorderPhotos.mutateAsync(photoOrders);
			toast.success("Photos reordered");
			refetchProfile();
		} catch {
			toast.error("Failed to reorder photos");
		}
	};
	const handlePromptSubmit = async (promptId, answer, displayOrder) => {
		try {
			await upsertPrompt.mutateAsync({
				prompt_id: promptId,
				answer,
				display_order: displayOrder
			});
			toast.success("Prompt saved!");
			refetchProfile();
		} catch {
			toast.error("Failed to save prompt");
		}
	};
	const handlePromptDelete = async (promptId) => {
		try {
			await deletePrompt.mutateAsync(String(promptId));
			toast.success("Prompt removed");
			refetchProfile();
		} catch {
			toast.error("Failed to remove prompt");
		}
	};
	const handleSave = async () => {
		setIsSaving(true);
		try {
			await updateProfile.mutateAsync(formData);
			toast.success("Profile saved!");
			refetchProfile();
		} catch (error) {
			toast.error("Failed to save profile");
		} finally {
			setIsSaving(false);
		}
	};
	const availablePrompts = allPrompts?.filter((p) => !myPrompts.some((mp) => mp.prompt_id === p.id)) || [];
	if (profileLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-screen items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 text-primary animate-spin" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-screen overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "hidden w-64 flex-col border-r border-border bg-surface/40 lg:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 border-b border-border px-4 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-10 w-10 place-items-center rounded-xl bg-primary/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-5 w-5 text-primary" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold",
						children: "Edit Profile"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex-1 space-y-1 overflow-y-auto px-2 py-4",
					children: [
						{
							id: "basics",
							label: "Basics",
							icon: User
						},
						{
							id: "photos",
							label: "Photos",
							icon: Image
						},
						{
							id: "prompts",
							label: "Prompts",
							icon: Hash
						},
						{
							id: "preferences",
							label: "Preferences",
							icon: Heart
						},
						{
							id: "social",
							label: "Social & Links",
							icon: Globe
						},
						{
							id: "privacy",
							label: "Privacy",
							icon: Shield
						}
					].map(({ id, label, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveSection(id),
						className: cn("flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition", activeSection === id ? "bg-primary/15 text-foreground font-medium" : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("h-4 w-4 shrink-0", activeSection === id && "text-primary") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
					}, id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => navigate({ to: "/app/dating" }),
						className: "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-surface-elevated hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), "Back to Match"]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between border-b border-border bg-background/60 px-5 py-3.5 backdrop-blur",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => navigate({ to: "/app/dating" }),
						className: "text-muted-foreground transition hover:text-foreground lg:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-lg font-semibold",
						children: "Edit Profile"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleSave,
					disabled: isSaving || updateProfile.isPending,
					className: "flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50",
					children: [isSaving || updateProfile.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), "Save"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 overflow-y-auto p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl space-y-6",
					children: [
						activeSection === "basics" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BasicsSection, {
							formData,
							onChange: handleChange
						}),
						activeSection === "photos" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotosSection, {
							myProfile,
							photoPreviews,
							photos,
							onPhotoUpload: handlePhotoUpload,
							onSavePhotos: handleSavePhotos,
							onRemovePhoto: handleRemovePhoto,
							onReorderPhotos: handleReorderPhotos,
							onRemovePreview: (index) => {
								setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
								setPhotos((prev) => prev.filter((_, i) => i !== index));
							},
							isSaving
						}),
						activeSection === "prompts" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptsSection, {
							myPrompts,
							availablePrompts,
							onPromptSubmit: handlePromptSubmit,
							onPromptDelete: handlePromptDelete
						}),
						activeSection === "preferences" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreferencesSection, {
							formData,
							onChange: handleChange,
							onArrayChange: handleArrayChange,
							handleTagInput
						}),
						activeSection === "social" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialSection, {
							formData,
							onChange: handleChange
						}),
						activeSection === "privacy" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrivacySection, {
							formData,
							onChange: handleChange
						})
					]
				})
			})]
		})]
	});
}
function BasicsSection({ formData, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-border glass p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-lg font-semibold mb-4 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-5 w-5 text-primary" }), "Basic Information"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
							children: "First Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: formData.first_name,
							onChange: (e) => onChange("first_name", e.target.value),
							placeholder: "Siddharth",
							className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
							children: "Last Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: formData.last_name,
							onChange: (e) => onChange("last_name", e.target.value),
							placeholder: "Mohta",
							className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
							children: "Age"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: "17",
							max: "35",
							value: formData.age,
							onChange: (e) => onChange("age", parseInt(e.target.value) || 0),
							className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
							children: "Gender"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: formData.gender,
							onChange: (e) => onChange("gender", e.target.value),
							className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select gender"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "male",
									children: "Male"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "female",
									children: "Female"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "non_binary",
									children: "Non-binary"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "prefer_not_to_say",
									children: "Prefer not to say"
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
							children: "Pronouns"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: formData.pronouns,
							onChange: (e) => onChange("pronouns", e.target.value),
							placeholder: "He/Him, She/Her, They/Them",
							className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
							children: "Year"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: formData.year,
							onChange: (e) => onChange("year", e.target.value),
							className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary",
							children: YEAR_OPTIONS.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: y,
								children: y
							}, y))
						})] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-border glass p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-lg font-semibold mb-4 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-5 w-5 text-primary" }), "Academic"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
							children: "Branch"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: formData.branch,
							onChange: (e) => onChange("branch", e.target.value),
							className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select branch"
							}), BRANCH_OPTIONS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: b,
								children: b
							}, b))]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
							children: "Major / Specialization"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: formData.major,
							onChange: (e) => onChange("major", e.target.value),
							placeholder: "Computer Science",
							className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
							children: "Hostel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: formData.hostel,
							onChange: (e) => onChange("hostel", e.target.value),
							className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select hostel"
							}), HOSTEL_OPTIONS.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: h,
								children: h
							}, h))]
						})] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-border glass p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-lg font-semibold mb-4 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-5 w-5 text-primary" }), "Bio"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: formData.bio,
						onChange: (e) => onChange("bio", e.target.value),
						placeholder: "Tell others about yourself...",
						rows: 4,
						className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary resize-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Max 500 characters"
					})
				]
			})
		]
	});
}
function PhotosSection({ myProfile, photoPreviews, photos, onPhotoUpload, onSavePhotos, onRemovePhoto, onReorderPhotos, onRemovePreview, isSaving }) {
	const existingPhotos = myProfile?.photos?.filter((p) => p.url).sort((a, b) => a.display_order - b.display_order) || [];
	const totalPhotos = existingPhotos.length + photoPreviews.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-2xl border border-border glass p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-lg font-semibold flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-5 w-5 text-primary" }),
							"Photos (",
							totalPhotos,
							"/3)"
						]
					}), photos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: onSavePhotos,
						disabled: isSaving,
						className: "flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), "Save Photos"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: [
						existingPhotos.map((photo, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "aspect-[3/4] rounded-xl overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: photo.url,
									alt: `Photo ${index + 1}`,
									className: "w-full h-full object-cover"
								}), photo.is_main && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-2 left-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-flex items-center gap-1 rounded-full bg-primary/90 px-2 py-1 text-[10px] font-semibold text-primary-foreground",
										children: "Main"
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => onRemovePhoto(photo.id),
									className: "p-2 rounded-full bg-red-500/90 text-white hover:bg-red-500 transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								}), !photo.is_main && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {},
									className: "p-2 rounded-full bg-primary/90 text-primary-foreground hover:bg-primary transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4" })
								})]
							})]
						}, photo.id)),
						photoPreviews.map((preview, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-[3/4] rounded-xl overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: preview,
									alt: `New photo ${index + 1}`,
									className: "w-full h-full object-cover"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => onRemovePreview(index),
									className: "p-2 rounded-full bg-red-500/90 text-white hover:bg-red-500 transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})
							})]
						}, index)),
						totalPhotos < 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "relative aspect-[3/4] rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer transition hover:border-primary hover:bg-surface-elevated",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									accept: "image/*",
									onChange: onPhotoUpload,
									className: "absolute inset-0 opacity-0 cursor-pointer",
									multiple: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-10 w-10 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-2 text-sm text-muted-foreground",
									children: "Add Photo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground/70",
									children: "Max 3 photos total"
								})
							]
						})
					]
				}),
				existingPhotos.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs text-muted-foreground",
					children: "Drag to reorder (drag-and-drop coming soon)"
				})
			]
		})
	});
}
function PromptsSection({ myPrompts, availablePrompts, onPromptSubmit, onPromptDelete }) {
	const [expandedPrompt, setExpandedPrompt] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-2xl border border-border glass p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-lg font-semibold mb-4 flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hash, { className: "h-5 w-5 text-primary" }),
						"Prompts (",
						myPrompts.length,
						"/3)"
					]
				}),
				myPrompts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4 mb-6",
					children: myPrompts.map((prompt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-xl border border-border bg-surface/50 p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold text-primary uppercase tracking-wider mb-1",
										children: prompt.prompt_category || "Prompt"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-foreground",
										children: prompt.prompt_text
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-sm text-foreground/90 italic",
										children: [
											"\"",
											prompt.answer,
											"\""
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setExpandedPrompt(expandedPrompt === prompt.id ? null : prompt.id),
									className: "p-2 rounded-full bg-surface hover:bg-border transition",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => onPromptDelete(prompt.prompt_id),
									className: "p-2 rounded-full bg-surface hover:bg-rose-500/10 hover:text-rose-400 transition",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})]
							})]
						})
					}, prompt.id))
				}),
				myPrompts.length < 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mb-3",
						children: "Add a prompt to show more personality"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: availablePrompts.slice(0, 6).map((prompt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptCard, {
							prompt,
							onAdd: onPromptSubmit,
							currentCount: myPrompts.length
						}, prompt.id))
					}),
					availablePrompts.length > 6 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "mt-3 text-sm text-primary hover:underline",
						children: [
							"Show all ",
							availablePrompts.length,
							" prompts"
						]
					})
				] }),
				myPrompts.length >= 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground text-center py-4",
					children: "You've added the maximum of 3 prompts"
				})
			]
		})
	});
}
function PromptCard({ prompt, onAdd, currentCount }) {
	const [showInput, setShowInput] = (0, import_react.useState)(false);
	const [answer, setAnswer] = (0, import_react.useState)("");
	if (!showInput) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick: () => setShowInput(true),
		className: "rounded-xl border border-border bg-surface p-4 text-left transition hover:border-primary hover:bg-surface-elevated",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-semibold text-primary uppercase tracking-wider mb-1",
			children: prompt.category || "Prompt"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium text-foreground",
			children: prompt.text
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-primary/30 bg-primary/5 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold text-primary uppercase tracking-wider mb-1",
				children: prompt.category || "Prompt"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-foreground mb-3",
				children: prompt.text
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: answer,
				onChange: (e) => setAnswer(e.target.value),
				placeholder: "Your answer...",
				rows: 3,
				className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary resize-none mb-3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						setShowInput(false);
						setAnswer("");
					},
					className: "rounded-xl border border-border px-4 py-2 text-sm transition hover:bg-surface-elevated",
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						onAdd(prompt.id, answer, currentCount);
						setShowInput(false);
						setAnswer("");
					},
					disabled: !answer.trim(),
					className: "rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50",
					children: "Add"
				})]
			})
		]
	});
}
function PreferencesSection({ formData, onChange, onArrayChange, handleTagInput }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-border glass p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-lg font-semibold mb-4 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-5 w-5 text-primary" }), "Relationship Preferences"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: RELATIONSHIP_OPTIONS.map(({ value, label, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition hover:border-primary hover:bg-surface-elevated",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: formData.relationship_preference.includes(value),
								onChange: (e) => onArrayChange("relationship_preference", value, e.target.checked),
								className: "h-4 w-4 text-primary rounded border-border focus:ring-primary"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: label
							})
						]
					}, value))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-border glass p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-lg font-semibold mb-4 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hash, { className: "h-5 w-5 text-primary" }), "Interests & Tags"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
							children: "Interests (comma separated)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: formData.interests.join(", "),
							onChange: (e) => handleTagInput("interests", e.target.value),
							placeholder: "Coding, Hackathons, Coffee, Anime",
							className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
							children: "Languages (comma separated)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: formData.languages.join(", "),
							onChange: (e) => handleTagInput("languages", e.target.value),
							placeholder: "English, Hindi, Spanish",
							className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
							children: "Clubs (comma separated)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: formData.clubs.join(", "),
							onChange: (e) => handleTagInput("clubs", e.target.value),
							placeholder: "ACM, IEEE, Dance Club, Debate Society",
							className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
							children: "Skills (comma separated)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: formData.skills.join(", "),
							onChange: (e) => handleTagInput("skills", e.target.value),
							placeholder: "React, Python, Figma, Public Speaking",
							className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
						})] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-border glass p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-lg font-semibold mb-4 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coffee, { className: "h-5 w-5 text-primary" }), "Favorites"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
						children: "Favorite Cafe"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: formData.favorite_cafe,
						onChange: (e) => onChange("favorite_cafe", e.target.value),
						placeholder: "Campus Coffee House",
						className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
						children: "Favorite Sport"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: formData.favorite_sport,
						onChange: (e) => onChange("favorite_sport", e.target.value),
						placeholder: "Badminton",
						className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
					})] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-border glass p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-lg font-semibold mb-4 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-5 w-5 text-primary" }), "Study Preferences"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
						children: "Study Subjects (comma separated)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: formData.study_subjects.join(", "),
						onChange: (e) => handleTagInput("study_subjects", e.target.value),
						placeholder: "DSA, DBMS, ML, OS",
						className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
								children: "CGPA Goal"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: formData.study_cgpa_goal,
								onChange: (e) => onChange("study_cgpa_goal", e.target.value),
								placeholder: "9.0",
								className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
								children: "Preferred Time"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: formData.study_preferred_time,
								onChange: (e) => onChange("study_preferred_time", e.target.value),
								placeholder: "Evenings, Late Night",
								className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
								children: "Preferred Location"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: formData.study_preferred_location,
								onChange: (e) => onChange("study_preferred_location", e.target.value),
								placeholder: "Library, Hostel Room",
								className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
							})] })
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-border glass p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-lg font-semibold mb-4 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "h-5 w-5 text-primary" }), "Startup Preferences"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition hover:border-primary hover:bg-surface-elevated",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: formData.startup_looking_for,
							onChange: (e) => onChange("startup_looking_for", e.target.checked),
							className: "h-4 w-4 text-primary rounded border-border focus:ring-primary"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: "I'm looking for a startup team"
						})]
					}), formData.startup_looking_for && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
							children: "Role Seeking"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: formData.startup_role,
							onChange: (e) => onChange("startup_role", e.target.value),
							className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select role"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "cofounder",
									children: "Co-founder"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "developer",
									children: "Developer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "designer",
									children: "Designer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "ml_engineer",
									children: "ML Engineer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "marketing",
									children: "Marketing"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "business",
									children: "Business"
								})
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
							children: "Skills I Offer (comma separated)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: formData.startup_skills.join(", "),
							onChange: (e) => handleTagInput("startup_skills", e.target.value),
							placeholder: "React, Node.js, UI/UX, Fundraising",
							className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
						})] })]
					})]
				})]
			})
		]
	});
}
function SocialSection({ formData, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-2xl border border-border glass p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-lg font-semibold mb-4 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-5 w-5 text-primary" }), "Social Links"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "h-5 w-5 text-pink-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: formData.instagram_url,
								onChange: (e) => onChange("instagram_url", e.target.value),
								placeholder: "https://instagram.com/username",
								className: "flex-1 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "h-5 w-5 text-blue-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: formData.linkedin_url,
								onChange: (e) => onChange("linkedin_url", e.target.value),
								placeholder: "https://linkedin.com/in/username",
								className: "flex-1 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "h-5 w-5 text-gray-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: formData.github_url,
								onChange: (e) => onChange("github_url", e.target.value),
								placeholder: "https://github.com/username",
								className: "flex-1 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: "These will be visible on your public profile"
				})
			]
		})
	});
}
function PrivacySection({ formData, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-2xl border border-border glass p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "text-lg font-semibold mb-4 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-5 w-5 text-primary" }), "Profile Visibility"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition hover:border-primary hover:bg-surface-elevated",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: formData.is_incognito,
						onChange: (e) => onChange("is_incognito", e.target.checked),
						className: "h-4 w-4 text-primary rounded border-border focus:ring-primary"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: "Incognito Mode"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Hide my profile from discovery. Only my matches and friends can see me."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
						children: "Show my profile to"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: formData.show_only,
						onChange: (e) => onChange("show_only", e.target.value),
						className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "Everyone"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "friends",
								children: "Friends Only"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "dating",
								children: "Dating Only"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Controls who can see your profile in discovery"
					})
				] })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-2xl border border-border glass p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "text-lg font-semibold mb-4 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-5 w-5 text-primary" }), "Verification"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-xl border border-border bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: "Identity Verified"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Verified with college email"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold", formData.is_verified ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"),
						children: formData.is_verified ? "✓ Verified" : "Pending"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-xl border border-border bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: "Photo Verified"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Selfie verification completed"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold", formData.photo_verified ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"),
						children: formData.photo_verified ? "✓ Verified" : "Not verified"
					})]
				})]
			})]
		})]
	});
}
//#endregion
export { ProfileEditor as component };
