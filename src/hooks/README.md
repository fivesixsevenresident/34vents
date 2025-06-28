# Custom Hooks Documentation

## Usage Examples

### Authentication Hook

```typescript
import { useAuth } from "./hooks";

function LoginComponent() {
  const { user, login, logout, isAuthenticated, isLoading } = useAuth();

  const handleLogin = async () => {
    try {
      await login("user@example.com", "password");
      // User is now authenticated and stored in localStorage
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.email}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### Problems Management Hook

```typescript
import { useProblems } from "./hooks";

function ProblemsComponent() {
  const { clientProblems, createProblem, isLoading, error } = useProblems();

  const handleCreateProblem = async () => {
    try {
      await createProblem({
        serviceType: "plumbing-repair",
        location: "toilet",
        description: "Toilet is clogged",
        priority: "urgent",
      });
      // Problem created and clientProblems will be updated automatically
    } catch (error) {
      console.error("Failed to create problem:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={handleCreateProblem}>Report Problem</button>
      <div>
        {clientProblems?.problems.map((problem) => (
          <div key={problem.id}>
            <h3>{problem.summary}</h3>
            <p>Status: {problem.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Profile Hook

```typescript
import { useProfile } from "./hooks";

function ProfileComponent() {
  const { profile, updateProfile, isLoading } = useProfile("client");

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>{profile?.personalInfo.name}</h2>
      <p>Member since: {profile?.personalInfo.memberSince}</p>

      <h3>Equipment</h3>
      {profile?.equipment.map((item) => (
        <div key={item.id}>
          <p>
            {item.type} - {item.brand}
          </p>
        </div>
      ))}
    </div>
  );
}
```

### Content Hooks

```typescript
import { useAbout, useCommonIssues, useTools, useWhy } from "./hooks";

function AboutPage() {
  const { aboutData, isLoading, error } = useAbout();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{aboutData?.title}</h1>
      <p>{aboutData?.mission}</p>
      {aboutData?.sections.map((section, index) => (
        <div key={index}>
          <h2>{section.heading}</h2>
          <p>{section.content}</p>
        </div>
      ))}
    </div>
  );
}
```

## TypeScript Types

All hooks are fully typed with TypeScript interfaces that match the backend API responses. The hooks handle:

- ✅ Authentication state management
- ✅ Automatic token storage/retrieval
- ✅ Loading states
- ✅ Error handling
- ✅ Data caching and refresh
- ✅ Optimistic updates
- ✅ Performance optimization with useCallback

## Backend Integration

These hooks connect to the following backend endpoints:

- `POST /login` - User authentication
- `POST /signup` - User registration
- `GET /problems/client` - Client service history
- `GET /problems/technician` - Technician assigned jobs
- `POST /problems` - Create new service request
- `GET /profile` - User profile data
- `GET /content/*` - Static content pages

All authenticated requests automatically include the JWT token in the Authorization header.
