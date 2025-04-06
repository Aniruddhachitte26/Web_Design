// frontend/src/components/admin/EmployeesList.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  CircularProgress,
  Alert,
  Button,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import {
  Work,
  SupervisorAccount,
  Search,
  Refresh,
  FilterAlt,
  MoreVert,
  Add,
  NavigateNext,
} from "@mui/icons-material";
import { fetchUsers } from "../../redux/actions/userActions";
import { Link, useNavigate } from "react-router-dom";

const EmployeesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.users);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      let filtered = users;

      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(
          (user) =>
            user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.type.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply type filter
      if (activeFilter !== "All") {
        filtered = filtered.filter(
          (user) => user.type.toLowerCase() === activeFilter.toLowerCase()
        );
      }

      setFilteredUsers(filtered);
    }
  }, [users, searchTerm, activeFilter]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleRefresh = () => {
    dispatch(fetchUsers());
  };

  const handleFilterMenuOpen = (event) => {
    setFilterMenuAnchor(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterMenuAnchor(null);
  };

  const handleFilterSelect = (filter) => {
    setActiveFilter(filter);
    setFilterMenuAnchor(null);
    setPage(0);
  };

  const handleAddJob = () => {
    navigate("/add-job");
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
        bgcolor: "#f8f7f5",
      }}
    >
      <Container maxWidth="lg" sx={{ width: "100%" }}>
        <Card
          elevation={0}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            mb: 4,
            width: "100%",
          }}
        >
          <CardHeader
            title="Employee Management"
            subheader="Manage and view all employees in the organization"
            sx={{
              bgcolor: "#eda45f",
              color: "white",
              "& .MuiCardHeader-subheader": {
                color: "rgba(255, 255, 255, 0.8)",
              },
            }}
            action={
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  startIcon={<Add />}
                  onClick={handleAddJob}
                  variant="contained"
                  sx={{
                    bgcolor: "white",
                    color: "#eda45f",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.9)",
                    },
                  }}
                >
                  Add Job
                </Button>
                <Button
                  startIcon={<Refresh />}
                  onClick={handleRefresh}
                  variant="contained"
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.3)",
                    },
                  }}
                >
                  Refresh
                </Button>
              </Box>
            }
          />

          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                justifyContent: "space-between",
                mb: 3,
                gap: 2,
              }}
            >
              <TextField
                placeholder="Search by name, email, or role..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "#eda45f" }} />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                sx={{
                  maxWidth: { xs: "100%", sm: "70%" },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&.Mui-focused fieldset": {
                      borderColor: "#eda45f",
                    },
                  },
                }}
              />

              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Chip
                  label={`Filter: ${activeFilter}`}
                  deleteIcon={<FilterAlt />}
                  onDelete={handleFilterMenuOpen}
                  onClick={handleFilterMenuOpen}
                  sx={{
                    borderRadius: 2,
                    "& .MuiChip-deleteIcon": {
                      color: "#eda45f",
                    },
                  }}
                />

                <Menu
                  anchorEl={filterMenuAnchor}
                  open={Boolean(filterMenuAnchor)}
                  onClose={handleFilterMenuClose}
                >
                  <MenuItem
                    onClick={() => handleFilterSelect("All")}
                    selected={activeFilter === "All"}
                  >
                    All
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleFilterSelect("Admin")}
                    selected={activeFilter === "Admin"}
                  >
                    Admin
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleFilterSelect("Employee")}
                    selected={activeFilter === "Employee"}
                  >
                    Employee
                  </MenuItem>
                </Menu>
              </Box>
            </Box>

            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                }}
              >
                {error}
              </Alert>
            )}

            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  my: 8,
                }}
              >
                <CircularProgress
                  sx={{
                    color: "#eda45f",
                    mb: 2,
                  }}
                />
                <Typography variant="body1" color="text.secondary">
                  Loading employees...
                </Typography>
              </Box>
            ) : (
              <>
                <TableContainer
                  sx={{
                    borderRadius: 2,
                    border: "1px solid rgba(0,0,0,0.05)",
                    boxShadow: "inset 0 0 10px rgba(0,0,0,0.02)",
                  }}
                >
                  <Table sx={{ width: "100%" }}>
                    <TableHead sx={{ bgcolor: "rgba(237, 164, 95, 0.1)" }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>User</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Status
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredUsers
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((user) => (
                          <TableRow
                            key={user._id}
                            hover
                            sx={{
                              transition: "all 0.2s ease",
                              "&:hover": {
                                bgcolor: "rgba(237, 164, 95, 0.05)",
                              },
                            }}
                          >
                            <TableCell>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Avatar
                                  src={
                                    user.imagePath
                                      ? `http://localhost:3000${user.imagePath}`
                                      : undefined
                                  }
                                  alt={user.fullName}
                                  sx={{
                                    mr: 2,
                                    bgcolor:
                                      user.type === "admin"
                                        ? "#eda45f"
                                        : "#333",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                  }}
                                >
                                  {user.fullName.charAt(0)}
                                </Avatar>
                                <Typography variant="body1" fontWeight={500}>
                                  {user.fullName}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Chip
                                label={user.type}
                                icon={
                                  user.type === "admin" ? (
                                    <SupervisorAccount fontSize="small" />
                                  ) : (
                                    <Work fontSize="small" />
                                  )
                                }
                                size="small"
                                sx={{
                                  borderRadius: 1,
                                  bgcolor:
                                    user.type === "admin"
                                      ? "rgba(237, 164, 95, 0.1)"
                                      : "rgba(51, 51, 51, 0.1)",
                                  color:
                                    user.type === "admin" ? "#eda45f" : "#333",
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Chip
                                label="Active"
                                size="small"
                                sx={{
                                  borderRadius: 1,
                                  bgcolor: "rgba(46, 125, 50, 0.1)",
                                  color: "success.main",
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Tooltip title="More actions">
                                <IconButton size="small">
                                  <MoreVert fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))}
                      {filteredUsers.length === 0 && !loading && (
                        <TableRow>
                          <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                            <Box
                              sx={{
                                width: 60,
                                height: 60,
                                borderRadius: "50%",
                                bgcolor: "rgba(237, 164, 95, 0.1)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mx: "auto",
                                mb: 2,
                              }}
                            >
                              <Search sx={{ fontSize: 30, color: "#eda45f" }} />
                            </Box>
                            <Typography
                              variant="h6"
                              color="text.secondary"
                              gutterBottom
                              fontWeight="medium"
                            >
                              No users found
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Try adjusting your search criteria
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box
                  sx={{
                    // frontend/src/components/admin/EmployeesList.jsx (continued)
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                    flexDirection: { xs: "column", sm: "row" },
                    gap: { xs: 2, sm: 0 },
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Showing{" "}
                    {filteredUsers.length > 0 ? page * rowsPerPage + 1 : 0} -{" "}
                    {Math.min((page + 1) * rowsPerPage, filteredUsers.length)}{" "}
                    of {filteredUsers.length} users
                  </Typography>

                  <TablePagination
                    component="div"
                    count={filteredUsers.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                    sx={{
                      ".MuiTablePagination-toolbar": {
                        paddingLeft: 0,
                      },
                      ".MuiTablePagination-selectIcon": {
                        color: "#eda45f",
                      },
                    }}
                  />
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default EmployeesList;
