export default function JobList({ jobs }) {
  return (
    <div>
      <h3>Open Jobs</h3>
      {jobs.map((job, i) => (
        <div key={i}>
          <p><b>{job.title}</b></p>
          <p>Budget: {job.budget} ETH</p>
          <p>Status: {job.status}</p>
        </div>
      ))}
    </div>
  );
}
